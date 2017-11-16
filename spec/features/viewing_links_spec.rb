# frozen_string_literal: true

require 'rails_helper'

RSpec.feature 'Viewing Links', type: :feature do
  let!(:public_links) { FactoryBot.create_list(:link, 3, :public) }
  let!(:private_links) { FactoryBot.create_list(:link, 3, :private) }

  it 'displays links view-only' do
    visit '/'

    public_links.each do |link|
      expect(page).to have_content(link.title)
    end
    private_links.each do |link|
      expect(page).not_to have_content(link.title)
    end
    expect(page).not_to have_content('Add')
    expect(page).not_to have_content('Edit')
  end
end
