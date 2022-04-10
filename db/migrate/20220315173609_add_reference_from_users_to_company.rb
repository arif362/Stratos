class AddReferenceFromUsersToCompany < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :contact, foreign_key: true, index: true
  end
end
