# frozen_string_literal: true

class Tag < ActsAsTaggableOn::Tag
  has_many :taggables, through: :taggings, source_type: 'Link'

  scope :publicly_visible, -> {
    joins('INNER JOIN taggings tl ON tags.id = tl.tag_id')
      .joins('INNER JOIN links l ON tl.taggable_type = \'Link\' AND tl.taggable_id = l.id')
      .where('l.published_at IS NOT NULL')
  }
end
