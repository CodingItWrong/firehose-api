# frozen_string_literal: true

require 'rails_helper'

RSpec.feature 'Managing Links', type: :feature do
  it 'allows managing links' do
    create_link
  end

  def create_link
    visit '/'

    click_on 'Add'
    fill_in 'URL', with: 'https://example.com'
    click_on 'Save'

    expect(page).to have_content('https://example.com')
  end
end
