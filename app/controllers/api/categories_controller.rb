module Api
  class CategoriesController < ApiController

    def index
      categories = Category.all
      render json: serialize(CategorySerializer, categories),
             status: :ok
    end

    schema(:create, :update) do
      optional(:id).value(:integer) # for update
      required(:categories).hash do
        required(:name).filled(:string)
      end
    end

    def create
      category = Category.new(permitted_attributes(Category))
      authorize(category)
      if category.valid? && category.save
        render json: serialize(CategorySerializer, category),
               status: :created
      else
        render json: serialize(ValidationsSerializer, category),
               status: :unprocessable_entity
      end
    end

    def update
      category = policy_scope(Category).find(safe_params[:id])
      category.assign_attributes(permitted_attributes(category))

      if authorize(category) && category.save
        render json: serialize(CategorySerializer, category),
             status: :ok
      else
        render json: serialize(ValidationsSerializer, category),
               status: :unprocessable_entity
      end
    end

  end
end
