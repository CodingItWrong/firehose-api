# frozen_string_literal: true

require 'rails_helper'
require 'link_parser'
require 'web_mentioner'

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
    source = 'The grapevine'
    comment = 'Best post'
    tags = %w[foo bar baz]

    expect(SendWebMentionJob).to receive(:perform_later)
      .with(/^http:\/\/www.example.com\/links\//)

    click_on_first_link 'Edit'
    fill_in 'Title', with: title
    fill_in 'Tags', with: tags.join(' ')
    fill_in 'Source', with: source
    fill_in 'Comment', with: comment
    check 'Public'
    click_on 'Save'

    expect(page).to have_content(title)
    expect(page).to have_content(source)
    expect(page).to have_content(comment)
    expect(page).to have_content('Public')
    tags.each do |tag|
      expect(page).to have_content(tag)
    end
  end

  def mark_link_read
    sleep 1
    click_on 'Add'
    fill_in 'URL', with: 'https://example.com/blog/second-blog-post-title'
    click_on 'Save'

    first_blog_post_title = 'Custom Title'
    second_blog_post_title = 'Second Blog Post Title'

    click_on_first_link 'Mark Read'
    expect(page).to_not have_content(second_blog_post_title)

    click_on 'Read'
    expect(page).to have_content(second_blog_post_title)

    click_on 'Unread'
    sleep 1

    expect(page).to have_content(first_blog_post_title)
    click_on_first_link 'Mark Read'
    expect(page).to_not have_content(first_blog_post_title)

    click_on 'Read'
    posts_in_order = /#{first_blog_post_title} .* #{second_blog_post_title}/
    expect(page.text).to match(posts_in_order)

    # confirm user stays on read page after editing
    click_on_first_link 'Edit'
    click_on 'Save'
    expect(page).to have_current_path(read_links_path)

    click_on 'Add'
    fill_in 'URL', with: 'https://example.com/blog/third-blog-post-title'
    click_on 'Save'

    third_blog_post_title = 'Third Blog Post Title'

    click_on 'Read'
    expect(page).to have_content(first_blog_post_title)
    click_on_first_link 'Mark Unread'
    expect(page).to have_current_path(read_links_path)
    expect(page).to_not have_content(first_blog_post_title)

    click_on 'Unread'
    posts_in_order = /#{first_blog_post_title} .* #{third_blog_post_title}/
    expect(page.text).to match(posts_in_order)
  end

  def delete_link
    click_on_first_link 'Delete'

    expect(page).not_to have_content('Custom Title')
  end

  def view_tag_pages
    click_on 'Add'
    fill_in 'URL', with: 'https://example.com/blog/post-with-qux-tag'
    click_on 'Save'

    click_on_first_link 'Edit'
    fill_in 'Tags', with: 'qux'
    click_on 'Save'

    click_on 'Add'
    fill_in 'URL', with: 'https://example.com/blog/read-post-with-qux-tag'
    click_on 'Save'

    click_on_first_link 'Edit'
    fill_in 'Tags', with: 'qux'
    click_on 'Save'

    click_on_first_link 'Mark Read'

    click_on_first_link 'Edit'
    fill_in 'Tags', with: 'qux'
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
    click_on 'qux'
    expect(page).to have_current_path('/tags/qux')
    expect(page).to have_content('Post With Qux Tag')
    expect(page).to have_content('Read Post With Qux Tag')
    expect(page).not_to have_content('Post With Bar Tag')
    expect(page).not_to have_content('Post With No Tag')
  end

  private

  def click_on_first_link(text)
    link = page.first(:link, text: /^#{Regexp.quote(text)}$/)
    raise("Link not found with text '#{text}'") if link.nil?
    link.click
  end

  def click_on_numbered_link(text, position)
    all = page.all(:link, text: /^#{Regexp.quote(text)}$/)
    link = all[position]
    if link.nil?
      raise("Link not found with text '#{text}' at position #{position}")
    end
    link.click
  end
end
