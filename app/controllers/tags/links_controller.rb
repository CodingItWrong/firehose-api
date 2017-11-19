# frozen_string_literal: true

module Tags
  class LinksController < ApplicationController
    def index
      @tag = ActsAsTaggableOn::Tag.find(params[:tag_id])
      @links = Link.joins(:tags)
                   .where('tags.id' => @tag.id)
                   .newest
                   .unread
    end
  end
end
