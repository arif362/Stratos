ActiveAdmin.register Risk do
  permit_params :user_id, :project_id, :name, :impact, :rank, :critical, :due_date

  index do
    selectable_column
    id_column
    column :name
    column :impact
    column :rank
    column :critical
    column :due_date

    column :project do |risk|
      risk.project.name
    end

    column :user do |risk|
      risk.user.email
    end

    actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :impact
      row :rank
      row :critical
      row :due_date

      row :project do |risk|
        risk.project.name
      end

      row :user do |risk|
        risk.user.email
      end
    end
  end

  form do |f|
    f.inputs "Project Risk" do
      f.input :name
      f.input :impact
      f.input :rank
      f.input :critical
      f.input :due_date
      f.input :project, :as => :select, :collection => Project.pluck(:name, :id), :include_blank => false
      f.input :user, :as => :select, :collection => User.pluck(:email, :id), :include_blank => false
    end
    f.actions
  end

end
