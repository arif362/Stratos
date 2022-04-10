ARG RUBY_IMAGE_REPO=ruby
FROM ${RUBY_IMAGE_REPO}:2.7.5-bullseye
RUN curl -sL https://deb.nodesource.com/setup_16.x | sed "s/exec_cmd 'apt-get update'/exec_cmd 'apt-get --allow-releaseinfo-change update'/" | bash -
RUN echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add
RUN apt-get -qq --allow-releaseinfo-change update \
        && apt-get install -y \
        apt-utils \
        less \
        nvi \
        postgresql-client-14 \
        nodejs \
        libssl-dev \
        tree \
        yarn

# Create working directory
ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

ARG APP_UID=1000
ARG APP_GID=1000

RUN groupadd -g ${APP_GID} app
RUN useradd -u ${APP_UID} -g ${APP_GID} -d $APP_HOME app

# Set up Bundler and application tree
ENV BUNDLE_GEMFILE=$APP_HOME/Gemfile \
    BUNDLE_JOBS=2 \
    BUNDLE_PATH=/bundle \
    BUNDLE_BIN=/bundle/bin

ENV GEM_HOME=/bundle HOME=/app
ENV PATH $GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH

COPY Gemfile* $APP_HOME/

RUN mkdir /bundle && chown -R app:app /bundle
RUN chown -R app:app $APP_HOME

USER app:app

RUN gem install bundler -v 2.1.4
VOLUME /bundle

EXPOSE 3000

