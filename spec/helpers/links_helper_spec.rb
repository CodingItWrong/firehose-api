# frozen_string_literal: true

require 'rails_helper'

RSpec.describe LinksHelper do
  describe '#domain' do
    it 'returns the domain part of the URL' do
      result = helper.domain('http://codingitwrong.com/wiki')
      expect(result).to eq('codingitwrong.com')
    end
  end
end
