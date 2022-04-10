class RemoveParentIdToCategories < ActiveRecord::Migration[6.1]
  def change
    remove_column :categories, :parent_id, :bigint, if_exists: true

    remove_reference :line_items, :category, index: true
    add_reference :line_items, :category_breakdown, foreign_key: true, index: true
  end
end
