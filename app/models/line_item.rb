class LineItem < ApplicationRecord

  has_one :budget_item

  belongs_to :project
  belongs_to :category_breakdown
end
