module Api
  class ContractsController < ApiController

    def index
      contracts = Contract.where(project_id: params[:project_id])
      render json: serialize(ContractSerializer, contracts),
             status: :ok
    end

    schema(:show) do
      required(:id).value(:integer)
    end

    def show
      contract = policy_scope(Contract).find(safe_params[:id])
      authorize(contract)
      render json: serialize(ContractSerializer, contract),
             status: :ok
    end

    schema(:create, :update) do
      optional(:id).value(:integer) # for update
      required(:contract).hash do
        required(:firm_name).filled(:string)
        required(:contract_breakdown).filled(:string)
        optional(:commitment_date).filled(:date)
        required(:commitment_value).filled(:decimal)
        required(:expenditures_to_date).filled(:decimal)
        optional(:files).filled(:array)
        required(:budget_item_id).filled(:integer)
        required(:project_id).filled(:integer)
      end
    end

    def create
      contract = Contract.new(permitted_attributes(Contract))
      authorize(contract)
      if contract.valid? && contract.save
        render json: serialize(ContractSerializer, contract),
               status: :created
      else
        render json: serialize(ValidationsSerializer, contract),
               status: :unprocessable_entity
      end
    end

    def update
      contract = policy_scope(Contract).find(safe_params[:id])
      contract.assign_attributes(permitted_attributes(contract))

      if authorize(contract) && contract.save
        render json: serialize(ContractSerializer, contract),
             status: :ok
      else
        render json: serialize(ValidationsSerializer, contract),
               status: :unprocessable_entity
      end
    end

  end
end
