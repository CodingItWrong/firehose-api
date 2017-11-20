# frozen_string_literal: true

class TagsController < ApplicationController
  before_action :authenticate_user!

  def show
    @tag = ActsAsTaggableOn::Tag.where(name: params[:id]).first
    @links = Link.joins(:tags)
                 .where('tags.id' => @tag.id)
                 .newest
                 .unread
  end
end
