# frozen_string_literal: true

class Link < ApplicationRecord
  acts_as_taggable

  scope :publicly_visible, -> { where('published_at IS NOT NULL') }
  scope :unread, -> { where(read: false) }
  scope :read, -> { where(read: true) }
  scope :in_moved_order, -> { order(moved_to_list_at: :desc) }
  scope :in_publish_order, -> { order(published_at: :desc) }

  after_initialize :init

  def public?
    published_at.present?
  end

  def public
    public?
  end

  def public=(set_public)
    if !public? && set_public != '0'
      publish
    elsif public? && set_public == '0'
      unpublish
    end
  end

  def publish
    self.published_at = Time.now
  end

  def unpublish
    self.published_at = nil
  end

  def mark_read
    self.read = true
    self.moved_to_list_at = DateTime.now
  end

  def mark_unread
    self.read = false
    self.moved_to_list_at = DateTime.now
  end

  private

  def init
    self.moved_to_list_at = DateTime.now
  end
end
