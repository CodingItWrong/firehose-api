# frozen_string_literal: true

class Tag < ApplicationRecord
  has_and_belongs_to_many :links

  scope :publicly_visible,
        -> { joins(:links).where('links.published_at IS NOT NULL') }
  scope :used, -> { joins(:links) }
end
