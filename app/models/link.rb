# frozen_string_literal: true

class Link < ApplicationRecord
  acts_as_taggable

  scope :unread, -> { where(read_at: nil) }

  def mark_read
    self.read_at = DateTime.now
  end
end
