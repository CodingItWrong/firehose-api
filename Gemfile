source 'https://rubygems.org'

git_source(:github) do |repo_name|
end

gem 'rails', '~> 5.1.4'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'devise'
gem 'acts-as-taggable-on'

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'bullet'
  gem 'faker'
end

group :development, :test do
  gem 'dotenv-rails'
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
end

group :production do
  gem 'rack-attack'
end
