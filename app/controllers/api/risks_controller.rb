module Api
  class RisksController < ApiController
    before_action :find_risk, only: [:show, :update]
    wrap_parameters :risk, include: Risk.attribute_names + [:assigned]

    def index
      authorize(Risk)

      if params[:project_id].present?
        # TODO: Scope this to current user's company
        project = Project.find(params[:project_id])
        risks = project.risks
      else
        # TODO: Scope this to current user's company
        risks = Risk.all
      end
      render json: serialize(RiskSerializer, risks),
        status: :ok
    end

    schema(:update) do
      required(:risk).hash do
        required(:id).filled(:integer)
        optional(:project_id).filled(:integer)
        optional(:assigned).filled(:string)
        optional(:name).filled(:string)
        optional(:impact).filled(:string)
        optional(:rank).filled(:integer)
        optional(:critical).filled(:bool)
        optional(:due_date).filled(:string)
      end
    end

    def update
      # @risk.update(**params)
    end

    schema(:create) do
      required(:risk).hash do
        required(:project_id).filled(:integer)
        required(:assigned).filled(:string)
        required(:name).filled(:string)
        optional(:impact).filled(:string)
        optional(:rank).filled(:integer)
        optional(:critical).filled(:bool)
        required(:due_date).filled(:string)
      end
    end

    def create
      risk = Risk.new(permitted_attributes(Risk))
      authorize(risk)
      if risk.valid? && risk.save
        render json: serialize(RiskSerializer, risk),
          status: :created
      else
        render json: serialize(ValidationsSerializer, risk),
          status: :unprocessable_entity
      end
    end

    def show
      authorize(@risk)
      render json: serialize(RiskSerializer, @risk),
        status: :ok
    end

    private

    def find_risk
      @risk = Risk.find params[:id]
    end
  end
end
