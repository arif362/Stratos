module Api
  class LineItemsController < ApiController

    def index
      # line_items = LineItem.where(project_id: params[:project_id])
      line_items = LineItem.all
      render json: serialize(LineItemSerializer, line_items),
             status: :ok
    end

    schema(:create, :update) do
      optional(:id).value(:integer) # for update
      required(:line_items).hash do
        required(:name).filled(:string)
        required(:project_id).filled(:integer)
        required(:category_breakdown_id).filled(:integer)
      end
    end

    def create
      item = LineItem.new(permitted_attributes(LineItem))
      authorize(item)
      if item.valid? && item.save
        render json: serialize(LineItemSerializer, item),
               status: :created
      else
        render json: serialize(ValidationsSerializer, item),
               status: :unprocessable_entity
      end
    end

    def update
      item = policy_scope(LineItem).find(safe_params[:id])
      item.assign_attributes(permitted_attributes(item))

      if authorize(item) && item.save
        render json: serialize(LineItemSerializer, item),
             status: :ok
      else
        render json: serialize(ValidationsSerializer, item),
               status: :unprocessable_entity
      end
    end

  end
end
