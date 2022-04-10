class SubCategory < ApplicationRecord

  has_many :category_breakdowns

  belongs_to :category

  validates :name, presence: true
end
