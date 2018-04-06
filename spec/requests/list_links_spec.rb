# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'list links', type: :request do
  let!(:public_link) { FactoryBot.create(:link, :public, tag_list: 'foo') }
  let!(:private_link) { FactoryBot.create(:link, :private) }

  let(:token) { FactoryBot.create(:access_token).token }

  context 'when not authenticated' do
    it 'returns all public links' do
      get '/api/bookmarks?include=tags'

      expect(response).to be_success

      jsonapi_response = JSON.parse(response.body)
      links = jsonapi_response['data']
      tags = jsonapi_response['included']

      expect(links.length).to eq(1)
      expect(links.first['attributes']['title']).to eq(public_link.title)
      expect(links.first['relationships']['tags']['data'].length).to eq(1)

      expect(tags.length).to eq(1)
      expect(tags.first['attributes']['name']).to eq('foo')
    end
  end

  context 'when authenticated' do
    it 'returns all links' do
      headers = {
        'Authorization' => "Bearer #{token}",
      }

      get '/api/bookmarks', headers: headers

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

    it 'allows accessing an individual link' do
      headers = {
        'Authorization' => "Bearer #{token}",
      }

      get "/api/bookmarks/#{private_link.id}", headers: headers

      expect(response).to be_success

      jsonapi_response = JSON.parse(response.body)
      link = jsonapi_response['data']

      expect(link['attributes']['title']).to eq(private_link.title)
    end
  end
end
