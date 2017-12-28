# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'IndieWeb integration' do
  it 'allows posting public shares' do
    disallows_sharing_private_links
    includes_microformats_for_public_links
    works_while_logged_in
  end

  def disallows_sharing_private_links
    private_link = FactoryBot.create(:link, :private)
    visit("/links/#{private_link.id}")
    expect(page.status_code).to eq(401)
  end

  def includes_microformats_for_public_links
    link = FactoryBot.create(:link, :public)
    visit("/links/#{link.id}")

    expect(page).to have_css('.h-entry')

    title = find('.p-name').text
    expect(title).to eq(link.title)
  end

  def works_while_logged_in
    user = FactoryBot.create(:user)
    sign_in(user)

    link = FactoryBot.create(:link, :public)
    visit("/links/#{link.id}")

    expect(page.status_code).to eq(200)
  end
end
