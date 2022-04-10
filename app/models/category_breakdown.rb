class CategoryBreakdown < ApplicationRecord

  has_many :line_items

  belongs_to :sub_category

  validates :name, presence: true
end
