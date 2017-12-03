# frozen_string_literal: true

require 'link_parser'

RSpec.describe LinkParser do
  subject(:link_parser) { LinkParser.new }

  describe '#canonical', vcr: true do
    it 'returns the passed-in url when there are no redirects' do
      url = 'http://codingitwrong.com'
      canonical = VCR.use_cassette('link_parser_canonical_no_redirects') {
        link_parser.canonical(url: url)
      }
      expect(canonical).to eq(url)
    end

    it 'follows redirects' do
      url = 'http://bit.ly/jay-is-great'
      canonical = VCR.use_cassette('link_parser_canonical_redirects') {
        link_parser.canonical(url: url)
      }
      expect(canonical).to eq('https://www.bignerdranch.com/blog/testing-external-dependencies-with-fakes/')
    end
  end

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

    it 'trims spaces' do
      url = 'https://www.destroyallsoftware.com/talks/ideology'
      title = VCR.use_cassette('link_parser_trim_spaces') {
        link_parser.title(url: url)
      }
      expect(title).to eq('Ideology')
    end

    it 'decodes entities' do
      url = 'http://confreaks.tv/videos/rubyconf2017-keynote-you-re-insufficiently-persuasive'
      title = VCR.use_cassette('link_parser_decode_entities') {
        link_parser.title(url: url)
      }
      expect(title).to eq("Confreaks TV | Keynote: You're Insufficiently Persuasive - Ruby Conference 2017")
    end
  end
end
