class ProcessMapSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :description

  attribute :descendants do |object|
    object.descendants.arrange_serializable
  end
end
