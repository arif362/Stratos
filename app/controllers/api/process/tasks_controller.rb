module Api
  module Process
    class TasksController < ApiController

      schema(:create) do
        required(:process_task).hash do
          required(:parent_id).filled(:integer)
          required(:project_id).filled(:integer)
          required(:name).filled(:string)
          required(:description).filled(:string)
          required(:user_role_id).filled(:integer)
          optional(:files).filled(:array)
          optional(:template_id).filled(:integer)
        end
      end
      def create
        process_task = ProcessTask.new(permitted_attributes(ProcessTask))
        authorize(process_task)
        if process_task.valid? && process_task.save
          render json: serialize(ProcessTaskSerializer, process_task),
            status: :created
        else
          render json: serialize(ValidationsSerializer, process_task),
            status: :unprocessable_entity
        end
      end

    end
  end
end