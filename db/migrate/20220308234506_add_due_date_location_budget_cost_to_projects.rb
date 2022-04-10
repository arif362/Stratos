class AddDueDateLocationBudgetCostToProjects < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :due_date, :timestamp
    add_column :projects, :location, :string
    add_column :projects, :budget_cents, :integer
    add_column :projects, :cost_cents, :integer
  end
end
