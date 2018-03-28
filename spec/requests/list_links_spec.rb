# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'list links', type: :request do
  let!(:public_link) { FactoryBot.create(:link, :public) }
  let!(:private_link) { FactoryBot.create(:link, :private) }

  let(:token) { FactoryBot.create(:access_token).token }

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

  context 'when authenticated' do
    it 'returns all links' do
      headers = {
        'Authorization' => "Bearer #{token}",
      }

      get '/api/links', headers: headers

      expect(response).to be_success

      jsonapi_response = JSON.parse(response.body)
      links = jsonapi_response['data']

      expect(links.length).to eq(2)

      link_titles = links.map { |link| link['attributes']['title'] }
      expect(link_titles).to match_array([
        public_link.title,
        private_link.title,
      ])
    end
  end
end
