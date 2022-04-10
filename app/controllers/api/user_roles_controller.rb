module Api
  class UserRolesController < ApiController

    def index
      authorize(UserRole)

      roles = UserRole.all
      render json: serialize(UserRoleSerializer, roles),
             status: :ok
    end

  end
end