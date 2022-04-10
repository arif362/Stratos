module Api
  module Process
    class StepsController < ApiController

      schema(:create) do
        required(:process_step).hash do
          required(:parent_id).filled(:integer)
          required(:project_id).filled(:integer)
          required(:name).filled(:string)
          required(:description).filled(:string)
          optional(:files).filled(:array)
          optional(:template_id).filled(:integer)
        end
      end
      def create
        process_step = ProcessStep.new(permitted_attributes(ProcessStep))
        authorize(process_step)
        if process_step.valid? && process_step.save
          render json: serialize(ProcessStepSerializer, process_step),
            status: :created
        else
          render json: serialize(ValidationsSerializer, process_step),
            status: :unprocessable_entity
        end
      end

    end
  end
end