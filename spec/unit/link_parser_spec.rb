# frozen_string_literal: true

require 'link_parser'

RSpec.describe LinkParser, :vcr do
  subject(:link_parser) { LinkParser }

  describe '#canonical' do
    it 'returns the passed-in url when there are no redirects' do
      url = 'http://codingitwrong.com'
      canonical = link_parser.process(url: url).canonical
      expect(canonical).to eq(url)
    end

    it 'follows redirects' do
      url = 'http://bit.ly/jay-is-great'
      canonical = link_parser.process(url: url).canonical
      expect(canonical).to eq('https://www.bignerdranch.com/blog/testing-external-dependencies-with-fakes/')
    end
  end

  describe '#title' do
    it 'loads the URL and returns the title tag text' do
      url = 'http://codingitwrong.com/2017/07/24/letting-people-learn.html'
      title = link_parser.process(url: url).title
      expect(title).to eq('Letting People Learn - CodingItWrong')
    end

    it 'follows redirects' do
      url = 'https://google.com'
      title = link_parser.process(url: url).title
      expect(title).to eq('Google')
    end

    it 'trims spaces' do
      url = 'https://www.destroyallsoftware.com/talks/ideology'
      title = link_parser.process(url: url).title
      expect(title).to eq('Ideology')
    end

    it 'decodes entities' do
      url = 'http://confreaks.tv/videos/rubyconf2017-keynote-you-re-insufficiently-persuasive'
      title = link_parser.process(url: url).title
      expect(title).to eq("Confreaks TV | Keynote: You're Insufficiently Persuasive - Ruby Conference 2017")
    end
  end
end
