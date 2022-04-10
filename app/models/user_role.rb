class UserRole < ApplicationRecord
  has_many :users
  belongs_to :company, required: true
end
