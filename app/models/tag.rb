# frozen_string_literal: true

class Tag < ApplicationRecord
  has_and_belongs_to_many :links

  scope :publicly_visible,
    -> { joins(:links).where.not(links: {published_at: nil}).distinct }
  scope :used, -> { joins(:links).distinct }
end
