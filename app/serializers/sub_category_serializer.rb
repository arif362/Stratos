class SubCategorySerializer
  include JSONAPI::Serializer

  has_many :category_breakdowns, serializer: CategoryBreakdownSerializer

  attributes :id, :name, :category_id
end
