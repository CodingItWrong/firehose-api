# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Link do
  describe '.search' do
    it 'returns records with a matching title, comment, or url' do
      FactoryBot.create(:link, title: 'Alpaca Bags')
      matches = [
        FactoryBot.create(:link, title: 'A Llama Observed'),
        FactoryBot.create(:link, url: 'https://llamas.example.com'),
        FactoryBot.create(:link, title: 'My Camel', comment: 'Actually a llama'),
      ]

      expect(Link.search('llama')).to eq(matches)
    end
  end

  describe '#tag_list' do
    let(:link) { FactoryBot.create(:link) }

    context 'when nil is assigned' do
      before(:each) do
        link.update!(tag_list: nil)
        link.reload
      end

      it 'allows reading the tag_list back as a string' do
        expect(link.tag_list).to eq('')
      end

      it 'assigns tags to the tags relation' do
        expect(link.tags.count).to eq(0)
      end
    end

    context 'when a string is assigned' do
      before(:each) do
        link.update!(tag_list: 'foo bar baz')
        link.reload
      end

      it 'allows reading the tag_list back as a string' do
        expect(link.tag_list).to eq('foo bar baz')
      end

      it 'assigns tags to the tags relation' do
        tag_names = link.tags.map(&:name)
        expect(tag_names).to match_array(%w[foo bar baz])
      end
    end
  end
end
