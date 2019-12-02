# frozen_string_literal: true

module Api
  class BookmarksController < ResourceController
    before_action :doorkeeper_authorize!,
                  except: %i[index index_related_resources get_related_resources]
  end
end
