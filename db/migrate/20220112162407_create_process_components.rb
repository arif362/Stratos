class CreateProcessComponents < ActiveRecord::Migration[6.1]
  def change
    create_table :process_components do |t|
      t.references :project, null: false, foreign_key: true
      t.bigint :template_id, null: true
      t.bigint :user_role_id, null: true # Process Map tasks are also associated with UserRoles
      t.string :identifier
      t.string :type
      t.string :name
      t.text :description
      t.datetime :starts_at
      t.datetime :ends_at
      t.datetime :completed_at
      t.timestamps
    end
  end
end
