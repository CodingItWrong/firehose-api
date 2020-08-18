# frozen_string_literal: true

require 'rails_helper'
require 'link_parser'

RSpec.describe 'receive webhook', type: :request do
  let(:url) { 'https://example.com/blog/sample-post-title' }

  let(:headers) { { 'Authorization' => "Bearer #{token}" } }

  let(:body) { { title: title, url: url } }

  let(:send!) { post hydrant_path, params: body, headers: headers }

  before(:each) do
    FirehoseConfig.api_key = '12345'
    LinkParser.fake!
  end

  context 'with incorrect API token' do
    let(:token) { '23456' }
    let(:title) { 'custom title' }

    it 'does not create a link' do
      expect { send! }.not_to(change { Link.count })
    end

    it 'returns unauthorized' do
      response = send!
      expect(response).to eq(401)
    end
  end

  context 'with correct API token' do
    let(:token) { '12345' }

    context 'immediately' do
      context 'with a title' do
        let(:title) { 'custom title' }

        it 'creates a link' do
          expect { send! }.to change { Link.count }.by(1)
        end

        it 'returns created' do
          response = send!
          expect(response).to eq(201)
        end

        it 'sets fields to passed-in values' do
          send!
          link = Link.last
          expect(link.url).to eq(url)
          expect(link.title).to eq(title)
        end
      end

      context 'without a title' do
        let(:title) { '' }

        it 'sets the title to empty' do
          send!
          link = Link.last
          expect(link.title).to eq('')
        end
      end
    end

    context 'after job completes' do
      before(:each) do
        LinkParser.fake!
      end

      context 'with a title' do
        let(:title) { 'custom title' }

        it 'keeps the passed-in title' do
          perform_enqueued_jobs { send! }
          link = Link.last
          expect(link.url).to eq(url)
          expect(link.title).to eq(title)
        end
      end

      context 'without a title' do
        let(:title) { '' }

        it 'sets the title from the retrieved URL' do
          perform_enqueued_jobs { send! }
          link = Link.last
          expect(link.url).to eq(url)
          expect(link.title).to eq('Sample Post Title')
        end
      end

      context 'with title equal to url' do
        let(:title) { url }

        it 'assumes that was a default title and sets the title from the URL' do
          perform_enqueued_jobs { send! }
          link = Link.last
          expect(link.url).to eq(url)
          expect(link.title).to eq('Sample Post Title')
        end
      end
    end
  end
end
