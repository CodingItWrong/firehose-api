source "https://rubygems.org"

ruby file: ".ruby-version"

gem "rails", "~> 8.0.0"
gem "pg", "~> 1.5"
gem "puma", "~> 6.5"
gem "devise"
gem "dotenv-rails"
gem "httparty"
gem "http-parser", "~> 1.2.3"
gem "sidekiq"
gem "jsonapi-resources", "< 0.10"
gem "jsonapi-resources-optional_paginators"
gem "doorkeeper"
gem "rack-cors"
gem "nokogiri"

group :development do
  gem "listen", ">= 3.0.5", "< 3.10"
end

group :development, :test do
  gem "pry-rails"
  gem "pry-byebug"
  gem "rspec-rails"
  gem "standard"
  gem "coderay"
end

group :test do
  gem "factory_bot_rails"
  gem "vcr"
  gem "webmock"
  gem "rspec_junit_formatter"
end

group :production do
  gem "rack-attack"
end
