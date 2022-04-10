class RemoveCompanyForeignKeyFromContacts < ActiveRecord::Migration[6.1]
  def change
    remove_reference :contacts, :company, index: true, foreign_key: true
  end
end
