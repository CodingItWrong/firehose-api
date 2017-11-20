# frozen_string_literal: true

require 'rails_helper'

RSpec.feature 'Viewing Links', type: :feature do
  let!(:public_links) { FactoryBot.create_list(:link, 3, :public) }
  let!(:private_links) { FactoryBot.create_list(:link, 3, :private) }
  let!(:public_tagged_links) {
    FactoryBot.create_list(:link, 3, :public, tag_list: 'foo')
  }
  let!(:private_tagged_links) {
    FactoryBot.create_list(:link, 3, :private, tag_list: 'foo')
  }
  let!(:links_tagged_with_a_private_only_tag) {
    FactoryBot.create_list(:link, 3, :private, tag_list: 'bar')
  }

  it 'displays public links' do
    view_links_page
    view_tag_page
  end

  def view_links_page
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

  def view_tag_page
    click_on 'Tags'

    expect(page).not_to have_content('bar')

    click_on 'foo'

    public_tagged_links.each do |link|
      expect(page).to have_content(link.title)
    end
    private_tagged_links.each do |link|
      expect(page).not_to have_content(link.title)
    end
  end
end
