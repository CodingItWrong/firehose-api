# frozen_string_literal: true

require "rails_helper"

RSpec.describe Tag do
  describe "#used" do
    it "does not return unused tags" do
      FactoryBot.create(:tag) # unused
      used_tag = FactoryBot.create(:tag)
      FactoryBot.create(:link, tags: [used_tag])

      results = Tag.used.to_a

      expect(results).to eql([used_tag])
    end

    it "removes duplicates" do
      tag = FactoryBot.create(:tag)
      FactoryBot.create_list(:link, 2, tags: [tag])

      results = Tag.used.to_a

      expect(results).to eql([tag])
    end
  end

  describe "#publicly_visible" do
    it "does not return unused tags" do
      FactoryBot.create(:tag) # unused
      used_tag = FactoryBot.create(:tag)
      FactoryBot.create(:link, :public, tags: [used_tag])

      results = Tag.publicly_visible.to_a

      expect(results).to eql([used_tag])
    end

    it "does not return tags for private links" do
      private_tag = FactoryBot.create(:tag)
      FactoryBot.create(:link, tags: [private_tag])
      public_tag = FactoryBot.create(:tag)
      FactoryBot.create(:link, :public, tags: [public_tag])

      results = Tag.publicly_visible.to_a

      expect(results).to eql([public_tag])
    end

    it "removes duplicates" do
      tag = FactoryBot.create(:tag)
      FactoryBot.create_list(:link, 2, :public, tags: [tag])

      results = Tag.publicly_visible.to_a

      expect(results).to eql([tag])
    end
  end
end
