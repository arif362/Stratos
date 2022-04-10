class Task < ApplicationRecord

  include Assignable

  belongs_to :project

  validates :name, presence: true
  validates :due_date, presence: { message: "A due date must be defined" }

end
