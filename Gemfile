source 'https://rubygems.org'

ruby '3.0.0'

gem 'rails', '~> 6.0.3'
gem 'pg', '~> 1.2'
gem 'puma', '~> 5.1'
gem 'devise'
gem 'dotenv-rails'
gem 'httparty'
gem 'twitter'
gem 'sidekiq'
gem 'jsonapi-resources'
gem 'doorkeeper'
gem 'rack-cors'

group :development do
  gem 'listen', '>= 3.0.5', '< 3.4'
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
