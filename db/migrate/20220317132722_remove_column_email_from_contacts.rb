class RemoveColumnEmailFromContacts < ActiveRecord::Migration[6.1]
  def change
    remove_column :contacts, :email, :string
  end
end
