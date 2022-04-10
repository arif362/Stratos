module Assignable
  extend ActiveSupport::Concern

  included do
    belongs_to :user
  end

  def as_json
    super(options).merge(
      assigned: assigned
    )
  end

  def assigned
    self.user.email
  end

  def assigned=(email)
    self.user_id = self.project.company.users.find_by(email: email).id
  end
end
