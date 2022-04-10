ActiveAdmin.register User do
  permit_params :company_id, :user_role_id, :contact_id, :email, :password, :password_confirmation

  index do
    selectable_column
    id_column
    column :email
    column :company
    column :current_sign_in_at
    column :sign_in_count
    column :created_at

    column :company do |user|
      user.company.name
    end
    column :contact do |user|
      user.contact.first_name + ' ' + user.contact.last_name
    end
    column :user_role do |user|
      user.user_role&.name
    end

    actions
  end

  show do
    attributes_table do
      row :id
      row :email
      row :company
      row :current_sign_in_at
      row :sign_in_count
      row :created_at

      row :company do |user|
        user.company.name
      end
      row :contact do |user|
        user.contact.first_name + ' ' + user.contact.last_name
      end
      row :user_role do |user|
        user.user_role&.name
      end
    end
  end

  filter :email
  filter :company
  filter :current_sign_in_at
  filter :sign_in_count
  filter :created_at

  form do |f|
    f.inputs "Add User" do
      f.input :company
      f.input :email
      f.input :password
      f.input :password_confirmation
      f.input :company, :as => :select, :collection => Company.pluck(:name, :id), :include_blank => false
      f.input :contact, :as => :select, :collection => Contact.select(:first_name, :last_name, :id).map{|c| [c.first_name + ' ' + c.last_name, c.id]}, :include_blank => false
      f.input :user_role, :as => :select, :collection => UserRole.pluck(:name, :id), :include_blank => false
    end
    f.actions
  end

end
