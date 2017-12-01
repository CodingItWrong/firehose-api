# frozen_string_literal: true

module LinksHelper
  def format_source(source)
    if http_url?(source)
      link_to 'source', source, target: '_blank'
    else
      "from #{source}"
    end
  end

  def domain(url)
    URI.parse(url).host
  end

  private

  def http_url?(string)
    uri = URI.parse(string)
    [URI::HTTP, URI::HTTPS].any? { |t| uri.is_a?(t) }
  rescue URI::InvalidURIError
    false
  end
end
