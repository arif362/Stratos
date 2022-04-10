class CreateUserRoles < ActiveRecord::Migration[6.1]
  def change
    create_table :user_roles do |t|
      t.string :name, null: false
      t.references :company, null: false, foreign_key: true
      t.timestamps
    end
  end
end
