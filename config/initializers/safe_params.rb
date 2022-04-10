require 'dry/schema'

Dry::Schema.config.messages.load_paths << Rails.root.join('config/locales/dry_schema.yaml')