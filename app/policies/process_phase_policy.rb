class ProcessPhasePolicy < ApplicationPolicy
  attr_reader :user, :process_phase

  def permitted_attributes
    [:parent_id, :project_id, :name, :description, files: []]
  end

  def initialize(user, process_phase)
    @user = user
    @process_phase = process_phase
  end

  # TODO: Actual user authorization
  # related components: Users/User roles & permissions

  def create?
    # TODO - Probably need a proper custom error message for this condition check
    unless process_phase.parent.is_a? ProcessMap
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