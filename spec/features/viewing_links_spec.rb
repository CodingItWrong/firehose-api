# frozen_string_literal: true

require 'rails_helper'

RSpec.feature 'Viewing Links', type: :feature do
  let!(:links) { FactoryBot.create_list(:link, 3) }

  it 'displays links view-only' do
    visit '/'

    links.each do |link|
      expect(page).to have_content(link.title)
    end
    expect(page).not_to have_content('Add')
    expect(page).not_to have_content('Edit')
  end
end
