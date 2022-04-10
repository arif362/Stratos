class CreateInvoices < ActiveRecord::Migration[6.1]
  def change
    create_table :invoices do |t|
      t.integer :value, null: false
      t.integer :number, null: false
      t.integer :amount, null: false
      t.integer :status, null: false, default: 0
      t.string :contract_breakdown
      t.datetime :recommended_status_date

      t.timestamps

      t.references :category, null: false, foreign_key: true
      t.references :project, null: false, foreign_key: true
    end
  end
end
