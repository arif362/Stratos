class CreateCompanies < ActiveRecord::Migration[6.1]
  def change
    create_table :companies do |t|
      t.string :name
      t.integer :users_count, null: false, default: 0
      t.integer :projects_count, null: false, default: 0
      t.timestamps
    end
  end
end
