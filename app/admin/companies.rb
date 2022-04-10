ActiveAdmin.register Company do

  permit_params :name

  index do
    selectable_column
    id_column
    column :name
    column :users_count
    column :projects_count
    actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :users_count
      row :projects_count
    end
  end

  form do |f|
    f.inputs "Company" do
      f.input :name
    end
    f.actions
  end
end
