class InvoiceSerializer
  include JSONAPI::Serializer

  has_many :files

  attributes :id, :value, :number, :status, :recommended_status_date, :firm_name, :contract_breakdown, :contract_id, :project_id
end
