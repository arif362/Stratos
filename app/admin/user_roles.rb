ActiveAdmin.register UserRole do
  permit_params :name, :company_id

  index do
    id_column
    selectable_column

    column :name
    column :company do |role|
      role.company.name
    end
    actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :company do |role|
        role.company.name
      end
    end
  end

  form do |f|
    f.inputs "Project Contact" do
      f.input :name
      f.input :company, :as => :select, :collection => Company.pluck(:name, :id), :include_blank => false
    end
    f.actions
  end

end
