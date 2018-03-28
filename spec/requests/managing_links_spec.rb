# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'managing links', type: :request do
  let!(:public_link) { FactoryBot.create(:link, :public) }
  let!(:private_link) { FactoryBot.create(:link, :private) }

  it 'creates a new link record' do
    # TODO why does this succeed?
    headers = {
      'Authorization' => 'Bearer ',
      'Content-Type' => 'application/vnd.api+json',
    }
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
end
