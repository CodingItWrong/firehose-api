# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  scope '/webhooks', module: :webhooks do
    post :hydrant, to: 'hydrant#post'
  end

  scope '/api' do
    use_doorkeeper

    scope module: :api do
      # TODO: investigate `jsonapi_resources`
      resources :my_links, only: %i[index show create update destroy], path: '/links'
      resources :tags, only: %i[index show] do
        # TODO: why isn't ember requesting /links?
        resources :my_links, only: :index, path: '/my-links'
      end
    end

    get '*_', to: 'frontend#missing'
  end

  get '*_', to: 'frontend#index'
end
