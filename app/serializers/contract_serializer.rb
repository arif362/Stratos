class ContractSerializer
  include JSONAPI::Serializer

  # has_many :files

  attributes :id, :firm_name, :contract_breakdown, :commitment_date, :commitment_value, :expenditures_to_date, :project_id, :budget_item_id
end
