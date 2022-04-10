class ProjectSerializer
  include JSONAPI::Serializer

  has_many :line_items, serializer: LineItemSerializer

  attributes :identifier, :name, :location, :description, :due_date, :budget, :cost
end
