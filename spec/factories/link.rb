# frozen_string_literal: true

FactoryBot.define do
  factory :link do
    sequence(:title) { |n| "Link #{n}" }
    url { 'https://example.com' }
    association :tags

    trait :public do
      published_at { Time.now }
    end

    trait :private do
      published_at { nil }
    end
  end
end
