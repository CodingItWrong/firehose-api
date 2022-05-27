source 'https://rubygems.org'

ruby '3.1.2'

gem 'rails', '~> 7.0'
gem 'pg', '~> 1.3'
gem 'puma', '~> 5.6'
gem 'devise'
gem 'dotenv-rails'
gem 'httparty'
gem 'twitter'
gem 'sidekiq'
gem 'jsonapi-resources', '< 0.10'
gem 'doorkeeper'
gem 'rack-cors'
gem 'nokogiri', '>= 1.11.0.rc4'

group :development do
  gem 'listen', '>= 3.0.5', '< 3.8'
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
end

group :development, :test do
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'rspec-rails'
  gem 'coderay'
end

group :test do
  gem 'factory_bot_rails'
  gem 'vcr'
  gem 'webmock'
  gem 'rspec_junit_formatter'
end

group :production do
  gem 'rack-attack'
end
