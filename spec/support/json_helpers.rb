module JsonHelpers

  def json_body
    JSON.parse(response.body, object_class: OpenStruct)
  end

  def json_hash
    JSON.parse(response.body).with_indifferent_access
  end

  def json_response
    JSON.parse(response.body)
  end

  def json_pretty(json = nil)
    JSON.pretty_generate(json || json_hash)
  end
end

RSpec.configure do |config|
  config.include JsonHelpers
end