class AddReferenceFromUserToUserRole < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :user_role_id, :integer, if_exists: true
    add_reference :users, :user_role, foreign_key: true, index: true
  end
end
