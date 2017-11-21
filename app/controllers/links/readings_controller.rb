# frozen_string_literal: true

module Links
  class ReadingsController < ApplicationController
    before_action :authenticate_user!

    def create
      link = Link.find(params[:link_id])
      link.mark_read
      link.save!
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json { render json: { success: true } }
      end
    end

    def destroy
      link = Link.find(params[:link_id])
      link.mark_unread
      link.save!
      respond_to do |format|
        format.html { redirect_to read_links_path }
        format.json { render json: { success: true } }
      end
    end
  end
end
