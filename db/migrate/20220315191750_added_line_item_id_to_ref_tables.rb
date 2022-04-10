class AddedLineItemIdToRefTables < ActiveRecord::Migration[6.1]
  def change
    add_reference :budget_items, :line_item, null: false, foreign_key: true
    add_reference :invoices, :line_item, null: false, foreign_key: true
  end
end
