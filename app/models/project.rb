class Project < ApplicationRecord
  belongs_to :company, counter_cache: true

  validates :name, presence: true
  validates :identifier, presence: true

  has_many :process_components
  has_many :risks
  has_many :tasks
  has_many :budget_items
  has_many :line_items
  has_many :activities

  def as_json
    super(options).merge(
      budget: budget,
      cost: cost
    )
  end

  # TODO: Ruby does some weird things with rounding when converting decimals
  # and integers, so this should be updated to be currency-safe
  def budget
    self.budget_cents.to_f / 100
  end

  def cost
    self.cost_cents.to_f / 100
  end

  def budget=(value)
    self.budget_cents = value * 100
  end

  def cost=(value)
    self.cost_cents = value * 100
  end
end
