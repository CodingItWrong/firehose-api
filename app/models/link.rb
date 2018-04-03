# frozen_string_literal: true

class Link < ApplicationRecord
  acts_as_taggable

  scope :publicly_visible, -> { where('published_at IS NOT NULL') }
  scope :unread, -> { where(read: false) }
  scope :read, -> { where(read: true) }
  scope :in_move_order, -> { order(moved_to_list_at: :desc) }
  scope :in_publish_order, -> { order(published_at: :desc) }

  before_create :set_default_values
  before_update :auto_update_values

  def public?
    published_at.present?
  end

  def public
    public?
  end

  def public=(set_public)
    if !public? && js_truthy(set_public)
      publish
    elsif public? && !js_truthy(set_public)
      unpublish
    end
  end

  def publish
    self.published_at = DateTime.now
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

  def js_truthy(set_public)
    set_public != false && set_public != '0'
  end

  def set_default_values
    self.moved_to_list_at = DateTime.now
  end

  def auto_update_values
    self.moved_to_list_at = DateTime.now if read_changed?
  end
end
