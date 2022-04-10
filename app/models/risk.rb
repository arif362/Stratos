class Risk < ApplicationRecord

  include Assignable

  belongs_to :project

  validates :name, presence: true
  validates :impact, presence: true
  validates :rank, presence: true
  validates :due_date, presence: { message: "A due date must be defined" }

  # Define the rank range of values
  enum rank: {
    low: 0,
    medium: 1,
    high: 2
  }

end
