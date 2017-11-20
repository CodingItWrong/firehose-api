# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users

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

  resources :tags, only: :show do
    scope module: :tags do
      resources :read, only: :index
    end
  end

  root to: 'links#index'
end
