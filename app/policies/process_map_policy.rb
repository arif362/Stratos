class ProcessMapPolicy < ApplicationPolicy

  def permitted_attributes
    [:name, :description, :project_id]
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

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end