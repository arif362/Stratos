class ValidationsSerializer
  #
  # Examples of JSON API spec error payloads
  # https://jsonapi.org/examples/#error-objects
  #
  # Discussion around usage of 400/403 or 422
  # https://stackoverflow.com/questions/3290182/rest-http-status-codes-for-failed-validation-or-invalid-duplicate
  #

  attr_reader :errors

  def initialize(object_with_errors, options = {})
    @errors = object_with_errors.errors
    @object = object_with_errors
  end

  def serializable_hash
    return if errors.nil?
    json = []
    errors.each do |err|
      json.push({
        status: '422',
        title: "Invalid attribute: #{err.attribute}",
        detail: err.full_message,
        source: { pointer: "data/attributes/#{err.attribute}"},
      })
    end
    return { errors: json }
  end

end
