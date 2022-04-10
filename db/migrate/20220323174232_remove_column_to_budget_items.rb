class RemoveColumnToBudgetItems < ActiveRecord::Migration[6.1]
  def change
    remove_column :budget_items, :firm_name, :string, if_exists: true
    remove_column :budget_items, :contract_breakdown, :string, if_exists: true

    remove_reference :invoices, :budget_item, index: true
    remove_reference :invoices, :line_item, index: true
  end
end
