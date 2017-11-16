# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  resources :links
  root to: 'links#index'
end
