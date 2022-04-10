RSpec.configure do |config|
  # Database cleaner does not allow remote urls
  # https://github.com/DatabaseCleaner/database_cleaner#safeguards
  if Rails.env.test?
    DatabaseCleaner.allow_remote_database_url = true
  end

  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end

  config.after(:each) do
    Faker::UniqueGenerator.clear
  end
end
