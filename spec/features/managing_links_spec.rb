# frozen_string_literal: true

require 'rails_helper'
require 'link_parser'

RSpec.feature 'Managing Links', type: :feature do
  before(:each) do
    LinkParser.fake!
  end

  it 'allows managing links' do
    create_link
    edit_link
  end

  def create_link
    visit '/'

    click_on 'Add'
    fill_in 'URL', with: 'https://example.com/blog/sample-blog-post-title'
    click_on 'Save'

    expect(page).to have_content('Sample Blog Post Title')
  end

  def edit_link
    click_on 'Edit'
    fill_in 'Title', with: 'Custom Title'
    click_on 'Save'

    expect(page).to have_content('Custom Title')
  end
end
