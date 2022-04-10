class ApiController < ActionController::API
  include Pundit

  def current_user
    nil
  end

  before_action do
    if safe_params && safe_params.failure?
      logger.debug("Failed safe_params: #{safe_params.errors.to_h}")
      logger.debug("  Ensure parameters are properly configured using schema helper from dry-rails gem in controller.")
      render json: serialize(InvalidParamsSerializer, safe_params),
               status: :unprocessable_entity
    end
  end

  def serialize(serializer_class, serializable, options = {})
    serializer_class.new(serializable, options).serializable_hash
  end
end
