class CompanySerializer
  include JSONAPI::Serializer
  attributes :id, :name, :users_count, :projects_count
end
