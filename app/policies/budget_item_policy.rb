class BudgetItemPolicy < ApplicationPolicy

  def permitted_attributes
    [:approved_budget, :anticipated_cost, :expenditures_to_date, files: [], :project_id, :line_item_id]
  end

  # TODO: Actual user authorization
  # related components: Users/User roles & permissions
  def index?
    true
  end

  def show?
    true
  end

  def create?
    true
  end

  def update?
    true
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
