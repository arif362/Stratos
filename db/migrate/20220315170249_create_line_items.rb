class CreateLineItems < ActiveRecord::Migration[6.1]
  def change
    create_table :line_items do |t|
      t.string :name

      t.timestamps

      t.references :project, null: false, foreign_key: true
    end
  end
end
