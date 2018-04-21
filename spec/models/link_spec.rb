# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Link do
  describe 'tags' do
    context 'when titles are assigned to tag_list' do
      let(:link) { FactoryBot.create(:link) }

      before(:each) do
        link.update_attributes!(tag_list: 'foo bar baz')
        link.reload
      end

      it 'assigns tags to the tags relation' do
        tag_names = link.tags.map(&:name)
        expect(tag_names).to match_array(%w[foo bar baz])
      end
    end
  end
end
