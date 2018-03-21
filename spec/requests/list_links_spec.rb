# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'list links', type: :request do
  let!(:public_link) { FactoryBot.create(:link, :public) }
  let!(:private_link) { FactoryBot.create(:link, :private) }

  context 'when not authenticated' do
    it 'returns all public links' do
      get '/api/links'

      expect(response).to be_success

      jsonapi_response = JSON.parse(response.body)
      links = jsonapi_response['data']

      expect(links.length).to eq(1)
      expect(links.first['attributes']['title']).to eq(public_link.title)
    end
  end
end
