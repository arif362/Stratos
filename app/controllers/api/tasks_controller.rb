module Api
  class TasksController < ApiController
    before_action :find_task, only: [:show, :update]
    wrap_parameters :task, include: Task.attribute_names + [:assigned]

    def index
      authorize(Task)

      if params[:project_id].present?
        # TODO: Scope this to current user's company
        project = Project.find(params[:project_id])
        tasks = project.tasks
      else
        # TODO: Scope this to current user's company
        tasks = Task.all
      end

      if params[:critical]
        tasks = tasks.where(critical: true)
      end

      if params[:mine]
        # TODO: Scope this to current user isntead of hard-coding
        tasks = tasks.where(user_id: 1)
      end

      render json: serialize(TaskSerializer, tasks),
        status: :ok
    end

    schema(:update) do
      required(:task).hash do
        required(:id).filled(:integer)
        optional(:project_id).filled(:integer)
        optional(:assigned).filled(:string)
        optional(:name).filled(:string)
        optional(:critical).filled(:bool)
        optional(:due_date).filled(:string)
      end
    end

    def update
      # @task.update(**params)
    end

    schema(:create) do
      required(:task).hash do
        required(:project_id).filled(:integer)
        required(:assigned).filled(:string)
        required(:name).filled(:string)
        optional(:critical).filled(:bool)
        required(:due_date).filled(:string)
      end
    end

    def create
      task = Task.new(permitted_attributes(Task))
      authorize(task)
      if task.valid? && task.save
        render json: serialize(TaskSerializer, task),
          status: :created
      else
        render json: serialize(ValidationsSerializer, task),
          status: :unprocessable_entity
      end
    end

    def show
      authorize(@task)
      render json: serialize(TaskSerializer, @task),
        status: :ok
    end

    private

    def find_task
      @task = Task.find params[:id]
    end
  end
end
