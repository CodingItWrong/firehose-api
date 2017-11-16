# frozen_string_literal: true

require 'link_parser'

RSpec.describe LinkParser do
  subject(:link_parser) { LinkParser.new }

  describe '#title', vcr: true do
    it 'loads the URL and returns the title tag text' do
      url = 'http://codingitwrong.com/2017/07/24/letting-people-learn.html'
      title = VCR.use_cassette('link_parser_title') {
        link_parser.title(url: url)
      }
      expect(title).to eq('Letting People Learn - CodingItWrong')
    end
  end
end
