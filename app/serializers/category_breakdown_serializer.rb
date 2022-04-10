class CategoryBreakdownSerializer
  include JSONAPI::Serializer

  has_many :line_items, serializer: LineItemSerializer

  attributes :id, :name, :sub_category_id
end
