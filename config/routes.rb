# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  scope '/webhooks', module: :webhooks do
    post :hydrant, to: 'hydrant#post'
  end

  scope '/api' do
    use_doorkeeper

    scope module: :api do
      # TODO: change to `jsonapi_resources`
      resources :bookmarks, only: %i[index show create update destroy]
      # jsonapi_resources :bookmarks
      resources :tags, only: %i[index show] do
        resources :bookmarks, only: :index
      end
    end

    get '*_', to: 'frontend#missing'
  end

  get '*_', to: 'frontend#index'
end
