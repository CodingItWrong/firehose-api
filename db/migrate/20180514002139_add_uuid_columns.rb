class AddUuidColumns < ActiveRecord::Migration[5.2]
  def up
    add_column :links, :uuid, :uuid, null: false, default: -> { 'gen_random_uuid()' }
    add_column :tags, :uuid, :uuid, null: false, default: -> { 'gen_random_uuid()' }
    add_column :links_tags, :link_uuid, :uuid
    add_column :links_tags, :tag_uuid, :uuid

    sql = <<-SQL
      UPDATE links_tags
      SET
        link_uuid = (
          SELECT uuid
          FROM links
          WHERE links.id = links_tags.link_id
        ),
        tag_uuid = (
          SELECT uuid
          FROM tags
          WHERE tags.id = links_tags.tag_id
        )
    SQL
    execute(sql)
  end

  def down
    remove_column :links, :uuid
    remove_column :tags, :uuid
    remove_column :links_tags, :link_uuid
    remove_column :links_tags, :tag_uuid
  end
end
