class Company < ApplicationRecord
  has_many :users
  has_many :projects
  has_many :contacts
  has_many :user_roles
end
