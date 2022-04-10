module Api
  module Process
    class ModulesController < ApiController

      schema(:create) do
        required(:process_module).hash do
          required(:parent_id).filled(:integer)
          required(:project_id).filled(:integer)
          required(:name).filled(:string)
          required(:description).filled(:string)
          optional(:files).filled(:array)
          optional(:template_id).filled(:integer)
        end
      end
      def create
        process_module = ProcessModule.new(permitted_attributes(ProcessModule))
        authorize(process_module)
        if process_module.valid? && process_module.save
          render json: serialize(ProcessModuleSerializer, process_module),
            status: :created
        else
          render json: serialize(ValidationsSerializer, process_module),
            status: :unprocessable_entity
        end
      end

    end
  end
end