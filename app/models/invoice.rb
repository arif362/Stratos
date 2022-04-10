class Invoice < ApplicationRecord
  has_many_attached :files
  belongs_to :project
  belongs_to :contract

  enum status: {
    pending: 0,
    approved: 1,
    rejected: 2
  }
end
