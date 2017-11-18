# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users

  resources :links do
    scope module: :links do
      resource :reading, only: :create
    end
  end

  root to: 'links#index'
end
