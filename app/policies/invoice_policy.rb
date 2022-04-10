class InvoicePolicy < ApplicationPolicy

  def permitted_attributes
    [:value, :number, :status, :firm_name, :contract_breakdown, :recommended_status_date, files: [], :project_id, :contract_id]
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
