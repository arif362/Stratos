class CreateRisks < ActiveRecord::Migration[6.1]
  def change
    create_table :risks do |t|
      t.string :name, null:false
      t.string :impact
      t.integer :rank, default: 0, null: false
      t.boolean :critical, default: false, null: false
      t.datetime :due_date, null: false

      t.timestamps

      t.references :project, null:false, foreign_key: true
      t.references :user, null: false, foreign_key: true
    end
  end
end
