class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :identifier
      t.string :name
      t.text :description
      t.timestamps
    end
  end
end
