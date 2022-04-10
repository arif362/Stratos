class CreateBudgetItems < ActiveRecord::Migration[6.1]
  def change
    create_table :budget_items do |t|
      t.integer :approved_budget
      t.integer :anticipated_cost
      t.integer :expenditures_to_date

      t.timestamps

      t.references :category, null: false, foreign_key: true
      t.references :project, null: false, foreign_key: true
    end
  end
end
