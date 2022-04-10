class Contract < ApplicationRecord
  has_many_attached :files
  has_many :invoices

  belongs_to :project
  belongs_to :budget_item
end
