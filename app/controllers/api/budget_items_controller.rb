module Api
  class BudgetItemsController < ApiController

    def index
      items = BudgetItem.where(project_id: params[:project_id])
      render json: serialize(BudgetItemSerializer, items),
             status: :ok
    end

    schema(:show) do
      required(:id).value(:integer)
    end

    def show
      item = policy_scope(BudgetItem).find(safe_params[:id])
      authorize(item)
      render json: serialize(BudgetItemSerializer, item),
             status: :ok
    end

    schema(:create, :update) do
      optional(:id).value(:integer) # for update
      required(:budget_item).hash do
        required(:approved_budget).filled(:integer)
        optional(:anticipated_cost).filled(:integer)
        optional(:expenditures_to_date).filled(:integer)
        optional(:files).filled(:array)
        required(:line_item_id).filled(:integer)
        required(:project_id).filled(:integer)
      end
    end

    def create
      item = BudgetItem.new(permitted_attributes(BudgetItem))
      authorize(item)
      if item.valid? && item.save
        render json: serialize(BudgetItemSerializer, item),
               status: :created
      else
        render json: serialize(ValidationsSerializer, item),
               status: :unprocessable_entity
      end
    end

    def update
      item = policy_scope(BudgetItem).find(safe_params[:id])
      item.assign_attributes(permitted_attributes(item))

      if authorize(item) && item.save
        render json: serialize(BudgetItemSerializer, item),
             status: :ok
      else
        render json: serialize(ValidationsSerializer, item),
               status: :unprocessable_entity
      end
    end

  end
end
