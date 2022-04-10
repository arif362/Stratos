class ProcessTaskPolicy < ApplicationPolicy
  attr_reader :user, :process_task

  def permitted_attributes
    [:parent_id, :project_id, :name, :description, files: []]
  end

  def initialize(user, process_task)
    @user = user
    @process_task = process_task
  end

  # TODO: Actual user authorization
  # related components: Users/User roles & permissions

  def create?
    # TODO - Proper custom error message
    unless process_task.parent.is_a? ProcessStep
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