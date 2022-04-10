module Api
  module Process
    class PhasesController < ApiController

      schema(:create) do
        required(:process_phase).hash do
          required(:parent_id).filled(:integer)
          required(:project_id).filled(:integer)
          required(:name).filled(:string)
          optional(:description).filled(:string)
          optional(:files).filled(:array)
          optional(:template_id).filled(:integer)
        end
      end
      def create
        process_phase = ProcessPhase.new(permitted_attributes(ProcessPhase))
        authorize(process_phase)
        if process_phase.valid? && process_phase.save
          options = {include: [:files] }
          render json: serialize(ProcessPhaseSerializer, process_phase, options),
            status: :created
        else
          render json: serialize(ValidationsSerializer, process_phase),
            status: :unprocessable_entity
        end
      end

    end
  end
end