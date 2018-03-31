# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'managing links', type: :request do
  let!(:public_link) { FactoryBot.create(:link, :public) }
  let!(:private_link) { FactoryBot.create(:link, :private) }

  let(:token) { FactoryBot.create(:access_token).token }
  let(:headers) {
    {
      'Authorization' => "Bearer #{token}",
      'Content-Type' => 'application/vnd.api+json',
    }
  }

  it 'creates a new link record' do
    params = {
      data: {
        type: 'my_links',
        attributes: {
          url: 'https://www.example.com',
        },
      },
    }
    post '/api/links', headers: headers, params: params.to_json

    expect(response.status).to eq(201)

    jsonapi_response = JSON.parse(response.body)
    link = jsonapi_response['data']
    expect(link['id']).not_to be_nil
  end

  it 'can update a link' do
    link = FactoryBot.create(:link, read: false)
    old_moved_to_list_at = link.moved_to_list_at

    title = 'Updated Title'
    params = {
      data: {
        type: 'my-links',
        id: link.id,
        attributes: {
          title: title,
          read: true,
          public: true,
        },
      },
    }
    patch "/api/links/#{link.id}", headers: headers, params: params.to_json

    puts response.body
    expect(response.status).to eq(200)

    jsonapi_response = JSON.parse(response.body)
    link = jsonapi_response['data']['attributes']
    expect(link['title']).to eq(title)
    expect(link['moved-to-list-at']).to be > old_moved_to_list_at
    expect(link['public']).to eq(true)
    expect(link['published-at']).not_to be_nil
  end

  it 'can delete a link' do
    link = FactoryBot.create(:link)

    expect {
      delete "/api/links/#{link.id}", headers: headers
    }.to change { Link.count }.by(-1)

    expect(response.status).to eq(204)
  end
end
