# frozen_string_literal: true

module Tags
  module Links
    class ReadController < ApplicationController
      def index
        @tag = ActsAsTaggableOn::Tag.find(params[:tag_id])
        @links = Link.joins(:tags)
                     .where('tags.id' => @tag.id)
                     .newest
                     .read
      end
    end
  end
end
