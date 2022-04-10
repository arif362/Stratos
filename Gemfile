source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }
ruby '2.7.5'

gem 'sassc-rails'
gem 'rails', '~> 6.1.4', '>= 6.1.4.1'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 5.0'
gem 'devise', '~> 4.8'              # https://github.com/heartcombo/devise
gem 'devise-jwt', '~> 0.9'          # https://github.com/waiting-for-dev/devise-jwt
gem 'pundit', '~> 2.1'              # https://github.com/varvet/pundit
gem 'jsonapi-serializer', '~> 2.2'  # https://github.com/jsonapi-serializer/jsonapi-serializer
gem 'dry-rails', '~> 0.4'           # https://github.com/dry-rb/dry-rails
# gem 'cssbundling-rails', '~> 0.2'   # https://github.com/rails/cssbundling-rails
# gem 'jsbundling-rails', '~> 0.2'    # https://github.com/rails/jsbundling-rails
gem 'ancestry', '~> 4.1'            # https://github.com/stefankroes/ancestry
gem 'activeadmin', '~> 2.9.0'       # https://github.com/activeadmin/activeadmin
gem 'bootsnap', '>= 1.4.4', require: false # Reduces boot times through caching; required in config/boot.rb
gem "figaro"
gem "webpacker"

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw] # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'rspec-rails', '~> 5.0.0'
  gem 'factory_bot_rails', '~> 6.2'
  gem 'faker', '~> 2.19.0'
end

group :development do
  gem 'web-console', '>= 4.1.0'      # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'rack-mini-profiler', '~> 2.0' # https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  gem 'listen', '~> 3.3'
end

group :test do
  gem 'webmock', '~> 3.0'
  gem 'database_cleaner-active_record'
  gem 'ruby-debug-ide'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
