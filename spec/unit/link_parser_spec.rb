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

    it 'follows redirects' do
      url = 'https://google.com'
      title = VCR.use_cassette('link_parser_title_redirect') {
        link_parser.title(url: url)
      }
      expect(title).to eq('Google')
    end

    it 'ignores duplicate title tags' do
      url = 'https://www.driftingruby.com/episodes/speeding-up-tests'
      title = VCR.use_cassette('link_parser_multiple_title_tags') {
        link_parser.title(url: url)
      }
      expect(title).to eq('Drifting Ruby | Speeding Up Tests')
    end
  end
end
