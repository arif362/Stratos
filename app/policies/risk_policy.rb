class RiskPolicy < ApplicationPolicy

  def permitted_attributes
    [:project_id, :user_id, :name, :assigned, :details, :due_date, :impact, :rank]
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
