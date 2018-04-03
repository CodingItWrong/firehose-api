# frozen_string_literal: true

class SpaceParser < ActsAsTaggableOn::GenericParser
  def parse
    ActsAsTaggableOn::TagList.new.tap do |tag_list|
      tag_list.add @tag_list.split(' ') if @tag_list.present?
    end
  end
end

ActsAsTaggableOn.default_parser = SpaceParser
ActsAsTaggableOn.remove_unused_tags = true
