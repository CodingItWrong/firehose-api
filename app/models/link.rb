# frozen_string_literal: true

class Link < ApplicationRecord
  has_and_belongs_to_many :tags

  scope :publicly_visible, -> { where.not(published_at: nil) }
  scope :unread, -> { where(read: false) }
  scope :read, -> { where(read: true) }
  scope :in_move_order, -> { order(moved_to_list_at: :desc) }
  scope :in_publish_order, -> { order(published_at: :desc) }

  before_save :populate_tags_from_tag_list
  before_create :set_default_values
  before_update :auto_update_values

  attr_writer :tag_list

  def tag_list
    tags.map(&:name).join(' ')
  end

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

  def populate_tags_from_tag_list
    return if @tag_list.nil?
    tag_array =
      if @tag_list.respond_to?(:strip) && @tag_list.respond_to?(:split)
        @tag_list.strip.split(/\s+/)
      else
        []
      end
    self.tags = tag_array.map { |tag| Tag.find_or_create_by(name: tag) }
  end
end
