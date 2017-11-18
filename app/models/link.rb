# frozen_string_literal: true

class Link < ApplicationRecord
  acts_as_taggable

  scope :publicly_visible, -> { where(public: true) }
  scope :unread, -> { where(read_at: nil) }
  scope :newest, -> { order(created_at: :desc) }

  def mark_read
    self.read_at = DateTime.now
  end
end
