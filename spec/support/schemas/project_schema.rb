require "dry-types"
require "dry-schema"

module Types
  include Dry.Types
end

ProjectSchema = Dry::Schema.JSON do
  required(:attributes).value(:hash) do
    required(:id).value(:integer)
    required(:name).value(:string)
    required(:identifier).value(:string)
    required(:description).value(:string)
  end
end

ProjectCollectionSchema = Dry::Schema.JSON do
  required(:data).value(Types::Array.of(ProjectSchema))
end

ProjectSinglularSchema = Dry::Schema.JSON do
  required(:data).value(ProjectSchema)
end