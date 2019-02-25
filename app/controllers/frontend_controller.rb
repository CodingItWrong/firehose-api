# frozen_string_literal: true

class FrontendController < ApplicationController
  def index
    path = File.join(Rails.root, 'public', 'index.html')
    html = File.read(path)
    render html: html.html_safe
  end

  def missing
    render json: { error: 'Not found' }, status: :not_found
  end
end
