# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users

  authenticated do
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

  scope module: :public do
    resources :links, only: :index
    resources :tags, only: %i[index show]
  end

  root to: 'public/links#index'
end
