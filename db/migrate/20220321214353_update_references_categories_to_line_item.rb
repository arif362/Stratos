class UpdateReferencesCategoriesToLineItem < ActiveRecord::Migration[6.1]
  def change
    add_reference :line_items, :category, null: false, foreign_key: true

    remove_reference :invoices, :category, index: true
    remove_reference :budget_items, :category, index: true
  end
end
