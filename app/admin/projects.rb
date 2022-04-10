ActiveAdmin.register Project do
  permit_params :identifier, :company_id, :user_id, :name, :description, :due_date, :location, :budget_cents, :cost_cents

  index do
    selectable_column
    id_column
    column :identifier
    column :name
    column :company
    column :due_date

    actions
  end

  show do
    attributes_table do
      row :id
      row :identifier
      row :name
      row :company
      row :due_date
      row :location
      row :budget_cents
      row :cost_cents
    end
  end

  form do |f|
    f.inputs "Project" do
      f.input :identifier
      f.input :name
      f.input :company, :as => :select, :collection => Company.pluck(:name, :id), :include_blank => false
      f.input :due_date
      f.input :location
      f.input :budget_cents
      f.input :cost_cents
    end
    f.actions
  end

end
