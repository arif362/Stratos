class FileSerializer
  include JSONAPI::Serializer
  attributes :id
  attribute :url do |object|
    Rails.application.routes.url_helpers.rails_blob_url(object)
  end
end