class LineItemSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :project_id, :category_breakdown_id
end
