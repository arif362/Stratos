class ContactSerializer
  include JSONAPI::Serializer
  attributes :id, :first_name, :last_name, :title, :phone
end
