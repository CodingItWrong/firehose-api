class ChangePrimaryKeysToUuids < ActiveRecord::Migration[5.2]
  def up
    remove_column :links, :id
    rename_column :links, :uuid, :id
    execute 'ALTER TABLE links ADD PRIMARY KEY (id);'

    remove_column :tags, :id
    rename_column :tags, :uuid, :id
    execute 'ALTER TABLE tags ADD PRIMARY KEY (id);'

    remove_column :links_tags, :link_id
    remove_column :links_tags, :tag_id

    rename_column :links_tags, :link_uuid, :link_id
    rename_column :links_tags, :tag_uuid, :tag_id
    execute 'ALTER TABLE links_tags ADD PRIMARY KEY (link_id, tag_id);'
    execute 'CREATE INDEX ON links_tags (link_id);'
    execute 'CREATE INDEX ON links_tags (tag_id);'
  end

  def down
    execute 'ALTER TABLE tags DROP CONSTRAINT tags_pkey;'
    rename_column :tags, :id, :uuid
    add_column :tags, :id, :primary_key

    execute 'ALTER TABLE links DROP CONSTRAINT links_pkey;'
    rename_column :links, :id, :uuid
    add_column :links, :id, :primary_key

    execute 'ALTER TABLE links_tags DROP CONSTRAINT links_tags_pkey;'

    rename_column :links_tags, :link_id, :link_uuid
    rename_column :links_tags, :tag_id, :tag_uuid

    add_column :links_tags, :link_id, :int
    add_column :links_tags, :tag_id, :int

    sql = <<-SQL
      UPDATE links_tags
      SET
        link_id = (
          SELECT id
          FROM links
          WHERE links.uuid = links_tags.link_uuid
        ),
        tag_id = (
          SELECT id
          FROM tags
          WHERE tags.uuid = links_tags.tag_uuid
        )
    SQL
    execute(sql)

    execute 'ALTER TABLE links_tags ADD PRIMARY KEY (link_id, tag_id);'
  end
end
