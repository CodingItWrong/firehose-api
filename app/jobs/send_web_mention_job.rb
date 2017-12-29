# frozen_string_literal: true

require 'web_mentioner'

class SendWebMentionJob < ApplicationJob
  queue_as :default

  def perform(source)
    web_mentioner.send_mention(source)
  end

  private

  def web_mentioner
    WebMentioner
  end
end
