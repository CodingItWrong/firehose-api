# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users

  authenticated do
    mount Sidekiq::Web => '/sidekiq'

    resources :links do
      collection do
        scope module: :links do
          resources :read, only: :index, as: :read_links
        end
      end

      scope module: :links do
        resource :reading, only: %i[create destroy]
      end
    end

    resources :tags, only: %i[index show]

    root to: 'links#index'
  end

  scope '/webhooks', module: :webhooks do
    post :hydrant, to: 'hydrant#post'
  end

  scope module: :public do
    resources :links, only: %i[index show]
    resources :tags, only: %i[index show]
  end

  scope '/api' do
    use_doorkeeper

    scope module: :api do
      resources :my_links, only: %i[index show create update destroy], path: '/links'
      resources :tags, only: :index
    end
  end

  root to: 'public/links#index'
end
