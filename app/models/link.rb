# frozen_string_literal: true

class Link < ApplicationRecord
  acts_as_taggable

  scope :publicly_visible, -> { where(public: true) }
  scope :unread, -> { where('read_at IS NULL') }
  scope :read, -> { where('read_at IS NOT NULL') }
  scope :newest, -> { order(created_at: :desc) }

  def read?
    read_at.present?
  end

  def mark_read
    self.read_at = DateTime.now
  end

  def mark_unread
    self.read_at = nil
  end
end
