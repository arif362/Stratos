class ProcessModulePolicy < ApplicationPolicy
  attr_reader :user, :process_module

  def permitted_attributes
    [:parent_id, :project_id, :name, :description, files: []]
  end

  def initialize(user, process_module)
    @user = user
    @process_module = process_module
  end

  # TODO: Actual user authorization
  # related components: Users/User roles & permissions

  def create?
    # TODO - Proper custom error message
    unless process_module.parent.is_a? ProcessPhase
      return false
    end

    true
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end