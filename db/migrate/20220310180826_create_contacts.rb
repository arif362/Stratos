class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :title
      t.string :phone
      t.string :email, null: false

      t.timestamps

      t.references :company, null:false, foreign_key: true

      t.index :first_name
      t.index :last_name
      t.index :email
      t.index [:email, :first_name, :last_name], unique: true
    end
  end
end
