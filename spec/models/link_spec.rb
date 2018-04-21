# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Link do
  describe 'tag_list' do
    let(:link) { FactoryBot.create(:link) }

    context 'when a string is assigned' do
      before(:each) do
        link.update_attributes!(tag_list: 'foo bar baz')
        link.reload
      end

      it 'allows reading the tag_list back as an array' do
        expect(link.tag_list).to match_array(%w[foo bar baz])
      end

      it 'assigns tags to the tags relation' do
        tag_names = link.tags.map(&:name)
        expect(tag_names).to match_array(%w[foo bar baz])
      end
    end

    context 'when an array is assigned' do
      before(:each) do
        link.update_attributes!(tag_list: %w[foo bar baz])
        link.reload
      end

      it 'allows reading the tag_list back as an array' do
        expect(link.tag_list).to match_array(%w[foo bar baz])
      end

      it 'assigns tags to the tags relation' do
        tag_names = link.tags.map(&:name)
        expect(tag_names).to match_array(%w[foo bar baz])
      end
    end
  end
end
