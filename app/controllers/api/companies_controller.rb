module Api
  class CompanyController < ApiController
    before_action :find_company, only: [:show, :update]

    def index
      authorize(Company)

      if params[:company_id].present?
        companys = Company.find_by(company_id: params[:company_id])
      else
        companys = Company.all
      end
      render json: serialize(CompanySerializer, companys),
             status: :ok
    end

    schema(:update) do
      required(:company).hash do
        required(:id).filled(:integer)
        optional(:name).filled(:string)
        optional(:users_count).filled(:integer)
        optional(:projects_count).filled(:string)
      end
    end

    def update
    end

    schema(:create) do
      required(:company).hash do
        required(:company_id).filled(:integer)
        optional(:name).filled(:string)
        optional(:users_count).filled(:integer)
        optional(:projects_count).filled(:string)
      end
    end

    def create
      company = Company.new(permitted_attributes(Company))
      if company.valid? && company.save
        render json: serialize(CompanySerializer, company),
               status: :created
      else
        render json: serialize(ValidationsSerializer, company),
               status: :unprocessable_entity
      end
    end

    def show
      authorize(@company)
      render json: serialize(CompanySerializer, @company),
             status: :ok
    end

    private

    def find_company
      # todo: Should we filter per project?
      @company = Company.find safe_params[:id]
    end
  end
end
