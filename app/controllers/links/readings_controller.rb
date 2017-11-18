# frozen_string_literal: true

module Links
  class ReadingsController < ApplicationController
    before_action :authenticate_user!

    def create
      link = Link.find(params[:link_id])
      link.mark_read
      link.save!
      redirect_to root_path
    end

    def destroy
      link = Link.find(params[:link_id])
      link.mark_unread
      link.save!
      redirect_to read_links_path
    end
  end
end
