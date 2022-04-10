module Api
  class SubCategoriesController < ApiController

    def index
      sub_categories = SubCategory.all
      render json: serialize(SubCategorySerializer, sub_categories),
             status: :ok
    end

    schema(:create, :update) do
      optional(:id).value(:integer) # for update
      required(:sub_categories).hash do
        required(:name).filled(:string)
        required(:category_id).filled(:integer)
      end
    end

    def create
      sub_category = SubCategory.new(permitted_attributes(SubCategory))
      authorize(sub_category)
      if sub_category.valid? && sub_category.save
        render json: serialize(SubCategorySerializer, sub_category),
               status: :created
      else
        render json: serialize(ValidationsSerializer, sub_category),
               status: :unprocessable_entity
      end
    end

    def update
      sub_category = policy_scope(SubCategory).find(safe_params[:id])
      sub_category.assign_attributes(permitted_attributes(sub_category))

      if authorize(sub_category) && sub_category.save
        render json: serialize(SubCategorySerializer, sub_category),
             status: :ok
      else
        render json: serialize(ValidationsSerializer, sub_category),
               status: :unprocessable_entity
      end
    end

  end
end
