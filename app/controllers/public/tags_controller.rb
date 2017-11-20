# frozen_string_literal: true

module Public
  class TagsController < ApplicationController
    def show
      @tag = ActsAsTaggableOn::Tag.where(name: params[:id]).first
      @links = Link.joins(:tags)
                   .where('tags.id' => @tag.id)
                   .newest
                   .publicly_visible
    end
  end
end
