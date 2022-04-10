class CreateSubCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :sub_categories do |t|
      t.string :name, null: false

      t.timestamps

      t.references :category, foreign_key: true, null: false
    end
  end
end
