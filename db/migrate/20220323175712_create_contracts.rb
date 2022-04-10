class CreateContracts < ActiveRecord::Migration[6.1]
  def change
    create_table :contracts do |t|
      t.string :firm_name, null: false
      t.string :contract_breakdown, null: false
      t.date :commitment_date
      t.decimal :commitment_value, precision: 20, scale: 2
      t.decimal :expenditures_to_date, precision: 20, scale: 2

      t.timestamps

      t.references :project, foreign_key: true, null: false
      t.references :budget_item, foreign_key: true, null: false
    end
  end
end
