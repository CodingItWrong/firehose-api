# frozen_string_literal: true

class TagsController < ApplicationController
  def show
    @tag = ActsAsTaggableOn::Tag.where(name: params[:id]).first
    @links = Link.joins(:tags)
                 .where('tags.id' => @tag.id)
                 .newest
                 .unread
  end
end
