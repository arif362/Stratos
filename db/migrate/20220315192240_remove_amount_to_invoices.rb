class RemoveAmountToInvoices < ActiveRecord::Migration[6.1]
  def change
    remove_column :invoices, :amount
  end
end
