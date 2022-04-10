class CreateCategoryBreakdowns < ActiveRecord::Migration[6.1]
  def change
    create_table :category_breakdowns do |t|
      t.string :name, null: false

      t.timestamps

      t.references :sub_category, foreign_key: true, null: false
    end
  end
end
