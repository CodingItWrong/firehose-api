# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'list tags', type: :request do
  let!(:public_link) { FactoryBot.create(:link, :public, tag_list: 'foo') }
  let!(:private_link) { FactoryBot.create(:link, :private, tag_list: 'bar') }

  let!(:foo_tag) { public_link.tags.first }

  context 'when not authenticated' do
    it 'returns all tags for public links' do
      get '/api/tags'

      expect(response).to be_successful

      jsonapi_response = JSON.parse(response.body)
      tags = jsonapi_response['data']

      expect(tags.length).to eq(1)
      expect(tags.first['attributes']['name']).to eq('foo')
    end

    it 'allows accessing an individual tag by name' do
      get "/api/tags/?filter[name]=foo&include=bookmarks"

      expect(response).to be_successful

      jsonapi_response = JSON.parse(response.body)
      tags = jsonapi_response['data']
      tag = tags[0]
      links = jsonapi_response['included']

      expect(tag['attributes']['name']).to eq('foo')

      expect(links.length).to eq(1)
      expect(links.first['attributes']['title']).to eq(public_link.title)
    end

    it "allows accessing a tag's links" do
      get "/api/tags/#{foo_tag.id}/bookmarks"

      expect(response).to be_successful

      jsonapi_response = JSON.parse(response.body)
      links = jsonapi_response['data']

      expect(links.length).to eq(1)
      expect(links.first['attributes']['title']).to eq(public_link.title)
    end
  end

  context 'when authenticated' do
    let(:token) { FactoryBot.create(:access_token).token }

    it 'returns all tags' do
      headers = {
        'Authorization' => "Bearer #{token}",
      }

      get '/api/tags', headers: headers

      expect(response).to be_successful

      jsonapi_response = JSON.parse(response.body)
      tags = jsonapi_response['data']

      expect(tags.length).to eq(2)

      tag_names = tags.map { |tag| tag['attributes']['name'] }
      expect(tag_names).to match_array(%w[foo bar])
    end
  end
end
