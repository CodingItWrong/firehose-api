# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'list links', type: :request do
  let!(:link_model) { FactoryBot.create(:link) }

  it 'returns a JSON representation of all links' do
    get '/api/links'

    expect(response).to be_success

    jsonapi_response = JSON.parse(response.body)
    links = jsonapi_response['data']

    expect(links.length).to eq(1)
    expect(links.first['attributes']['title']).to eq(link_model.title)
  end
end
