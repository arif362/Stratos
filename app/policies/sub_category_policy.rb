class SubCategoryPolicy < ApplicationPolicy

  def permitted_attributes
    [:name, :category_id]
  end

  # TODO: Actual user authorization
  # related components: Users/User roles & permissions
  def index?
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
