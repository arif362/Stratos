class ProcessPhaseSerializer
  include JSONAPI::Serializer

  has_many :files

  attributes :id, :name, :description, :parent_id
end
