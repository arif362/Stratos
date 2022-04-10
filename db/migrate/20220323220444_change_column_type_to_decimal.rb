class ChangeColumnTypeToDecimal < ActiveRecord::Migration[6.1]
  def change
    change_column :invoices, :value, :decimal, precision: 20, scale: 2

    change_column :budget_items, :approved_budget, :decimal, precision: 20, scale: 2
    change_column :budget_items, :anticipated_cost, :decimal, precision: 20, scale: 2
    change_column :budget_items, :expenditures_to_date, :decimal, precision: 20, scale: 2
  end

  def up
    change_column :invoices, :value, :decimal, precision: 20, scale: 2

    change_column :budget_items, :approved_budget, :decimal, precision: 20, scale: 2
    change_column :budget_items, :anticipated_cost, :decimal, precision: 20, scale: 2
    change_column :budget_items, :expenditures_to_date, :decimal, precision: 20, scale: 2
  end

  def down
    change_column :invoices, :value, :integer

    change_column :budget_items, :approved_budget, :integer
    change_column :budget_items, :anticipated_cost, :integer
    change_column :budget_items, :expenditures_to_date, :integer
  end
end
