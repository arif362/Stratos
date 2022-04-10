module Api
  class CategoryBreakdownsController < ApiController

    def index
      category_breakdowns = CategoryBreakdown.all
      render json: serialize(CategoryBreakdownSerializer, category_breakdowns),
             status: :ok
    end

    schema(:create, :update) do
      optional(:id).value(:integer) # for update
      required(:category_breakdowns).hash do
        required(:name).filled(:string)
        required(:sub_category_id).filled(:integer)
      end
    end

    def create
      category_breakdown = CategoryBreakdown.new(permitted_attributes(CategoryBreakdown))
      authorize(category_breakdown)
      if category_breakdown.valid? && category_breakdown.save
        render json: serialize(CategoryBreakdownSerializer, category_breakdown),
               status: :created
      else
        render json: serialize(ValidationsSerializer, category_breakdown),
               status: :unprocessable_entity
      end
    end

    def update
      category_breakdown = policy_scope(CategoryBreakdown).find(safe_params[:id])
      category_breakdown.assign_attributes(permitted_attributes(category_breakdown))

      if authorize(category_breakdown) && category_breakdown.save
        render json: serialize(CategoryBreakdownSerializer, category_breakdown),
             status: :ok
      else
        render json: serialize(ValidationsSerializer, category_breakdown),
               status: :unprocessable_entity
      end
    end

  end
end
