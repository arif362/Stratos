class BudgetItemSerializer
  include JSONAPI::Serializer

  # has_many :files

  attributes :id, :approved_budget, :anticipated_cost, :expenditures_to_date, :project_id, :line_item_id

  attribute :line_item_name do |object|
    object.line_item&.name
  end

  attribute :category_breakdown do |object|
    object.line_item&.category_breakdown&.name
  end

  attribute :sub_category do |object|
    object.line_item&.category_breakdown&.sub_category&.name
  end

  attribute :major_category do |object|
    object.line_item&.category_breakdown&.sub_category&.category&.name
  end
end
