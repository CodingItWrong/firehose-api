# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'receive webhook', type: :request do
  let(:url) { 'https://example.com' }
  let(:title) { 'custom title' }

  let(:headers) {
    {
      'Authorization' => "Bearer #{token}",
    }
  }

  let(:body) {
    {
      title: title,
      url: url,
    }
  }

  let(:send!) { post hydrant_path, params: body, headers: headers }

  before(:each) do
    FirehoseConfig.api_token = '12345'
  end

  context 'with incorrect API token' do
    let(:token) { '23456' }

    it 'creates a link' do
      expect { send! }.not_to change { Link.count }
    end

    it 'returns unauthorized' do
      response = send!
      expect(response).to eq(401)
    end
  end

  context 'with correct API token' do
    let(:token) { '12345' }

    it 'creates a link' do
      expect { send! }.to change { Link.count }.by(1)
    end

    it 'sets appropriate fields' do
      send!
      link = Link.last
      expect(link.url).to eq(url)
      expect(link.title).to eq(title)
    end

    it 'returns created' do
      response = send!
      expect(response).to eq(201)
    end
  end
end
