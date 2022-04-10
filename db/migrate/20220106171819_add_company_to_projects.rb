class AddCompanyToProjects < ActiveRecord::Migration[6.1]
  def change
    add_reference :projects, :company, null: false, foreign_key: true
  end
end
