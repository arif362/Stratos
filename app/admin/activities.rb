ActiveAdmin.register Activity do
  permit_params :name, :duration, :baseline_end, :baseline_start, :starts_at, :ends_at, :predecessor, :link_type

  index do
    id_column
    selectable_column

    column :name
    column :duration
    column :baseline_start
    column :baseline_end
    column :starts_at
    column :ends_at
    column :predecessor
    column :link_type
    column :project do |action|
      action.project.name
    end
    actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :duration
      row :baseline_start
      row :baseline_end
      row :starts_at
      row :ends_at
      row :predecessor
      row :link_type
      row :project do |action|
        action.project.name
      end
    end
  end

  form do |f|
    f.inputs "Project Activities" do
      f.input :name
      f.input :duration
      f.input :baseline_start
      f.input :baseline_end
      f.input :starts_at
      f.input :ends_at
      f.input :predecessor
      f.input :link_type
      f.input :project, :as => :select, :collection => Company.pluck(:name, :id), :include_blank => false
    end
    f.actions
  end

end
