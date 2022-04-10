module Api
  class ProjectsController < ApiController
    wrap_parameters :project, include: Project.attribute_names + [:budget, :cost]

    # https://phil.tech/2017/building-apis-with-rails-handling-errors-nicely/
    # https://apisyouwonthate.com/blog/writing-documentation-via-contract-testing

    # TODO: Need to use policies and scope to limit what's returned here
    # for proper user authorization
    # related components: Users/User roles & permissions
    def index
      authorize(Project)

      projects = Project.all
      render json: serialize(ProjectSerializer, projects),
             status: :ok
    end


    schema(:show) do
      required(:id).value(:integer)
    end

    def show
      project = policy_scope(Project).find(safe_params[:id])
      authorize(project)
      render json: serialize(ProjectSerializer, project),
             status: :ok
    end

    schema(:create, :update) do
      optional(:id).value(:integer) # for update
      required(:project).hash do
        required(:name).filled(:string)
        required(:description).filled(:string)
        required(:identifier).filled(:string)
      end
    end

    def create
      # TODO: Grab the current user's company
      company = Company.first
      project = company.projects.new(permitted_attributes(Project))
      authorize(project)
      if project.valid? && project.save
        render json: serialize(ProjectSerializer, project),
               status: :created
      else
        render json: serialize(ValidationsSerializer, project),
               status: :unprocessable_entity
      end
    end

    def update
      project = policy_scope(Project).find(safe_params[:id])
      project.assign_attributes(permitted_attributes(project))

      if authorize(project) && project.save
        render json: serialize(ProjectSerializer, project),
             status: :ok
      else
        render json: serialize(ValidationsSerializer, project),
               status: :unprocessable_entity
      end
    end

  end
end
