# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  scope '/webhooks', module: :webhooks do
    post :hydrant, to: 'hydrant#post'
  end

  scope '/api' do
    use_doorkeeper

    scope module: :api do
      resources :my_links, only: %i[index show create update destroy], path: '/links'
      resources :tags, only: %i[index show]
    end
  end

  get '*frontend_path', to: 'frontend#index'
end
