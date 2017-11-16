# frozen_string_literal: true

FactoryBot.define do
  factory :link do
    sequence(:title) { |n| "Link #{n}" }
    url 'https://example.com'

    trait :public do
      public true
    end

    trait :private do
      public false
    end
  end
end
