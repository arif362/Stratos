# Stratos Application Readme

## System dependencies
* Ruby 2.7
* Postgres 14
* Foreman - Installed via `bin/setup`
* Yarn - Installed via `bin/setup`


## Development

There are two ways to set up and run this app:

* Directly (deprecated)
* Via Docker

The instructions for setting up and running directly are below, but it's
recommended to skip to the bottom for the Docker-based setup.

### Local Environment Setup
* Install Ruby
* Install Postgres - https://postgresapp.com/downloads.html
* run `bin/setup`
* Add [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) to your browser 

#### Environment variables
* Details forthcoming


#### Running the Server
* run `bin/dev`
* visit http://localhost:3000


### Clientside Development

#### Yarn & Installing New Javascript Packages
* `bin/yarn ...some command...` to run any yarn command
* `bin/yarn add {PACKAGE_NAME}`

#### MirageJs

Mirage JS is an API mocking library that lets you build, test and share a complete working JavaScript application without having to rely on any backend APIs or services.

* We will lean on Mirage to separate client development from depending on API development.
* See `/app/javascript/mirage.js`
* For Guides, Features & API see https://miragejs.com/

### Running Tests
* `bin/bundle exec rspec` to run all tests
* `bin/bundle exec rspec ./path/to/spec/file` to run a specific test suite

## Deployments

Further details to come on Staging & Production environments and deployment
strategies as provided by Positive Internet

## Docker-based Setup

### Build the Application container

```bash
docker-compose build
```

### Download the Database container

```bash
docker-compose pull
```

### Ensure proper permissions

Because Docker runs a little differently depending on if you're on a Mac
or Linux machine, we need to ensure the container's permissions are
correct:

```bash
docker-compose run --rm --no-deps --user root web chown -R $(docker-compose run --rm --no-deps web id -u | tr -d '\r'):$(docker-compose run --rm --no-deps web id -g | tr -d '\r') /bundle
```

### Install Gemfile dependencies

```bash
docker-compose run --rm --no-deps web bundle install
```

### Create and prepare the database

```bash
docker-compose run --rm web rails db:prepare
```

The above command is the same as running these three commands
individually:

```bash
docker-compose run --rm web rails db:create
docker-compose run --rm web rails db:migrate
docker-compose run --rm web rails db:seed
```

### Install Package.json dependencies

Install front-end JavaScript dependencies:

```bash
docker-compose run --rm --no-deps web yarn install
```

### Run the application server

```bash
docker-compose up -d web
```

Alternatively, you can run the Rails server in a foreground process,
which is convenient for watching the Rails logs and being able to stop
the server at any time with `ctrl+c`:

```bash
docker-compose up web
```

### Run the tests

```bash
docker-compose run --rm --no-deps web bundle exec rspec
```

## Active Admin

#### Create Test ActiveAdmin user

The seed data contain a test admin user who is given access to the Active Admin dashboard. 

```bash
docker-compose run --rm web rails db:seed
```

|      Email        | Password   |
|:-----------------:|:----------:|
| admin@example.com |  password  |

Navigate to the URL below to access Active Admin dashboard

```bash
http://localhost:3000/admin
```

### Generating Database Schema Diagram

To re-generate the `docs/database_schema` diagrams from the current
database and ActiveRecord model configurations, first run the web
service locally:

```
docker-compose up web
```

Then in another terminal, install Railroady and Graphviz into the
currently running container:

```
docker-compose exec web gem install railroady
docker-compose exec -u root web apt-get install -y graphviz
```

Then re-generate the SVG and PNG formats:

```
docker-compose exec web /bin/bash -c 'railroady -M | dot -Tsvg > docs/database_schema.svg'
docker-compose exec web /bin/bash -c 'railroady -M | dot -Tpng -Gbgcolor=#FFFFFF > docs/database_schema.png'
```

Finally, add and commit the updated diagram to Git.
