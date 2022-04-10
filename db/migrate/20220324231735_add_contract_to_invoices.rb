class AddContractToInvoices < ActiveRecord::Migration[6.1]
  def change
    add_reference :invoices, :contract, null: false, foreign_key: true
  end
end
