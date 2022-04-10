class BudgetItemPolicy < ApplicationPolicy

  def permitted_attributes
    [:firm_name, :contract_breakdown, :commitment_date, :commitment_value, :expenditures_to_date, files: [], :project_id, :budget_item_id]
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
