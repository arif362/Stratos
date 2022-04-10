ActiveAdmin.register Contact do
  permit_params :first_name, :last_name, :title, :phone

  index do
    selectable_column
    id_column
    column :first_name
    column :last_name
    column :title
    column :phone

    actions
  end

  show do
    attributes_table do
      row :id
      row :first_name
      row :last_name
      row :title
      row :phone
    end
  end

  form do |f|
    f.inputs "Project Contact" do
      f.input :first_name
      f.input :last_name
      f.input :title
      f.input :phone
    end
    f.actions
  end

end
