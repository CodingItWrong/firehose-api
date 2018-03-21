# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'auth', type: :request do
  let(:user_password) { 'password' }
  let(:user) { FactoryBot.create(:user, password: user_password) }

  let(:params) {
    {
      grant_type: :password,
      username: username,
      password: entered_password,
    }
  }

  before(:each) do
    post '/api/oauth/token', params: params
  end

  context 'with invalid account info' do
    let(:username) { user.email }
    let(:entered_password) { 'bad_password' }

    it 'returns unauthorized' do
      expect(response.status).to eq(401)
    end
  end

  context 'with valid account info' do
    let(:username) { user.email }
    let(:entered_password) { user_password }

    it 'returns a token' do
      expect(response).to be_success

      jsonapi_response = JSON.parse(response.body)

      expect(jsonapi_response['access_token']).to be_present
    end
  end
end
