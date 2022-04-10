class BudgetItem < ApplicationRecord
  has_many_attached :files
  has_many :contracts
  belongs_to :project
  belongs_to :line_item
end
