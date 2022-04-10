class RiskSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :impact, :rank, :critical, :due_date, :created_at, :user_id, :project_id, :assigned
end
