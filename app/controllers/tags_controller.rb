# frozen_string_literal: true

class TagsController < ApplicationController
  def show
    @tag = ActsAsTaggableOn::Tag.where(name: params[:id]).first
    @links = links_for_current_user
  end

  private

  def links_for_current_user
    links = Link.joins(:tags)
                .where('tags.id' => @tag.id)
                .newest
    if user_signed_in?
      links.unread
    else
      links.publicly_visible
    end
  end
end
