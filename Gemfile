source 'https://rubygems.org'

ruby '2.5.3'

gem 'rails', '~> 5.2.1.1'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
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
  gem 'faker'
end

group :development, :test do
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'rspec-rails'
  gem 'coderay'
end

group :test do
  gem 'capybara'
  gem 'factory_bot_rails'
  gem 'vcr'
  gem 'webmock'
  gem 'rspec_junit_formatter'
end

group :production do
  gem 'rack-attack'
end
