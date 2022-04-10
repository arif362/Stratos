class ProcessStepPolicy < ApplicationPolicy
  attr_reader :user, :process_step

  def permitted_attributes
    [:parent_id, :project_id, :name, :description, files: []]
  end

  def initialize(user, process_step)
    @user = user
    @process_step = process_step
  end

  # TODO: Actual user authorization
  # related components: Users/User roles & permissions

  def create?
    # TODO - Proper custom error message
    unless process_step.parent.is_a? ProcessModule
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