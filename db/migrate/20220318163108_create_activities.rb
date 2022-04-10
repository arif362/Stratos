class CreateActivities < ActiveRecord::Migration[6.1]
  def change
    create_table :activities do |t|
      t.string :name, null: false
      t.integer :duration, null: false
      t.datetime :baseline_start
      t.datetime :baseline_end
      t.datetime :starts_at
      t.datetime :ends_at
      t.string :predecessor
      t.string :link_type

      t.timestamps

      t.references :project, foreign_key: true, null: false
    end
  end
end
