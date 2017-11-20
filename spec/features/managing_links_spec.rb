# frozen_string_literal: true

require 'rails_helper'
require 'link_parser'

RSpec.feature 'Managing Links', type: :feature do
  before(:each) do
    LinkParser.fake!
    user = FactoryBot.create(:user)
    sign_in user
  end

  it 'allows managing links' do
    create_link
    edit_link
    mark_link_read
    delete_link
    view_tag_pages
  end

  def create_link
    visit '/'

    click_on 'Add'
    fill_in 'URL', with: 'https://example.com/blog/sample-blog-post-title'
    click_on 'Save'

    expect(page).to have_content('Sample Blog Post Title')
  end

  def edit_link
    title = 'Custom Title'
    comment = 'Best post'
    tags = %w[foo bar baz]

    click_on_first_link 'Edit'
    fill_in 'Title', with: title
    fill_in 'Tags', with: tags.join(' ')
    fill_in 'Comment', with: comment
    check 'Public'
    click_on 'Save'

    expect(page).to have_content(title)
    expect(page).to have_content(comment)
    expect(page).to have_content('Public')
    tags.each do |tag|
      expect(page).to have_content(tag)
    end
  end

  def mark_link_read
    title = 'Custom Title'
    click_on_first_link 'Mark Read'
    expect(page).to have_current_path(root_path)
    expect(page).to_not have_content(title)

    click_on 'Read'
    expect(page).to have_content(title)

    click_on_first_link 'Edit'
    click_on 'Save'
    expect(page).to have_current_path(read_links_path)

    click_on_first_link 'Mark Unread'
    expect(page).to have_current_path(read_links_path)
    expect(page).to_not have_content(title)

    click_on 'Links'
    expect(page).to have_content(title)
  end

  def delete_link
    click_on_first_link 'Delete'

    expect(page).not_to have_content('Custom Title')
  end

  def view_tag_pages
    click_on 'Add'
    fill_in 'URL', with: 'https://example.com/blog/post-with-foo-tag'
    click_on 'Save'

    click_on_first_link 'Edit'
    fill_in 'Tags', with: 'foo'
    click_on 'Save'

    click_on 'Add'
    fill_in 'URL', with: 'https://example.com/blog/post-with-bar-tag'
    click_on 'Save'

    click_on_first_link 'Edit'
    fill_in 'Tags', with: 'bar'
    click_on 'Save'

    click_on 'Add'
    fill_in 'URL', with: 'https://example.com/blog/post-with-no-tag'
    click_on 'Save'

    click_on 'Tags'
    click_on 'foo'
    expect(page).to have_current_path('/tags/foo')
    expect(page).to have_content('Post With Foo Tag')
    expect(page).not_to have_content('Post With Bar Tag')
    expect(page).not_to have_content('Post With No Tag')

    visit '/'
    click_on_first_link 'Mark Read'
    click_on_first_link 'Mark Read'
    click_on_first_link 'Mark Read'

    click_on 'Read'
    click_on_first_link 'foo'
    expect(page).to have_current_path('/tags/foo/read')
    expect(page).to have_content('Post With Foo Tag')
    expect(page).not_to have_content('Post With Bar Tag')
    expect(page).not_to have_content('Post With No Tag')
  end

  private

  def click_on_first_link(text)
    link = page.first(:link, text: /^#{Regexp.quote(text)}$/)
    raise("Link not found with text '#{text}'") if link.nil?
    link.click
  end
end
