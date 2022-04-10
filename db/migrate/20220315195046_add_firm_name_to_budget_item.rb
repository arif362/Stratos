class AddFirmNameToBudgetItem < ActiveRecord::Migration[6.1]
  def change
    add_column :budget_items, :firm_name, :string
    add_column :budget_items, :contract_breakdown, :string

    add_column :invoices, :firm_name, :string
    add_reference :invoices, :budget_item, null: false, foreign_key: true
  end
end
