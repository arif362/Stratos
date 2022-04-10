class InvalidParamsSerializer
  #
  # Examples of JSON API spec error payloads
  # https://jsonapi.org/examples/#error-objects
  #
  # Discussion around usage of 400/403 or 422
  # https://stackoverflow.com/questions/3290182/rest-http-status-codes-for-failed-validation-or-invalid-duplicate
  #

  attr_reader :errors

  def initialize(object_with_errors, options = {})
    @errors = object_with_errors.errors.to_h
    @object = object_with_errors
  end

  def serializable_hash
    return if errors.nil?
    errs = []
    errors.each do |key, messages|
      collect_errors(key, messages, errs)
    end
    return { errors: errs }
  end

  def collect_errors(key, messages, items)
    if messages.is_a? Hash
      messages.each do |key, messages|
        collect_errors(key, messages, items)
      end
    else
      messages.each do |msg|
        items.push({
          status: '422',
          title: "Invalid attribute: #{key}",
          detail: "#{key.to_s.humanize} #{msg}",
          source: { pointer: "data/params/#{key}"},
        })
      end
    end
    items
  end

end