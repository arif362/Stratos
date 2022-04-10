class ProcessStepSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :description, :parent_id
end
