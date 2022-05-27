# frozen_string_literal: true

FactoryBot.define do
  factory :link do
    sequence(:title) { |n| "Link #{n}" }
    url { 'https://example.com' }

    trait :public do
      published_at { Time.zone.now }
    end

    trait :private do
      published_at { nil }
    end
  end
end
