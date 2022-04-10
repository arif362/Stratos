class ContactPolicy < ApplicationPolicy

  def permitted_attributes
    [:id, :first_name, :last_name, :title, :phone]
  end

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
