class TaskSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :critical, :due_date, :created_at, :user_id, :project_id, :assigned
end
