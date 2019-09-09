source 'https://rubygems.org'

ruby '2.6.3'

gem 'rails', '~> 6.0.0'
gem 'pg', '~> 1.1'
gem 'puma', '~> 4.1'
gem 'devise'
gem 'dotenv-rails'
gem 'httparty'
gem 'twitter'
gem 'sidekiq'
gem 'jsonapi-resources'
gem 'doorkeeper'
gem 'rack-cors'

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'bullet'
  gem 'rubocop'
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
