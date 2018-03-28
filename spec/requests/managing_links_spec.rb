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
    link = FactoryBot.create(:link)

    title = 'Updated Title'
    params = {
      data: {
        type: 'my-links',
        id: link.id,
        attributes: {
          title: title,
        },
      },
    }
    patch "/api/links/#{link.id}", headers: headers, params: params.to_json

    expect(response.status).to eq(200)

    jsonapi_response = JSON.parse(response.body)
    link = jsonapi_response['data']
    expect(link['attributes']['title']).to eq(title)
  end
end
