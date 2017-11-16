# frozen_string_literal: true

FactoryBot.define do
  factory :link do
    sequence(:title) { |n| "Link #{n}" }
    url 'https://example.com'
  end
end
