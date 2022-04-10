class AddAncestryToProcessComponents < ActiveRecord::Migration[6.1]
  def change
    add_column :process_components, :ancestry, :string
    add_index :process_components, :ancestry
  end
end
