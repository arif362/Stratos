class CategorySerializer
  include JSONAPI::Serializer

  has_many :sub_categories, serializer: SubCategorySerializer

  attributes :id, :name
end
