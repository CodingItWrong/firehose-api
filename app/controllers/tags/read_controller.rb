# frozen_string_literal: true

module Tags
  class ReadController < ApplicationController
    def index
      @tag = ActsAsTaggableOn::Tag.where(name: params[:tag_id]).first
      @links = Link.joins(:tags)
                   .where('tags.id' => @tag.id)
                   .newest
                   .read
    end
  end
end
