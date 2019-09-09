FROM ruby:2.6.3

# install OS dependencies
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update && \
    apt-get install -y nodejs
RUN npm install -g yarn ember-cli
RUN gem install bundler
RUN gem install foreman
RUN gem install nokogiri -v 1.10.1

# install app dependencies
RUN mkdir /myapp
WORKDIR /myapp

COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install

COPY frontend/package.json /myapp/frontend/package.json
COPY frontend/yarn.lock /myapp/frontend/yarn.lock
RUN cd frontend && \
    yarn install

# build and configure app
COPY . /myapp
RUN cd frontend && \
    ember build --prod

ENV RAILS_ENV=production
ENV RAILS_LOG_TO_STDOUT=true
ENV RAILS_SERVE_STATIC_FILES=true

EXPOSE 3000

# run app
CMD bin/rails db:create db:migrate && \
    bin/wait-for-it.sh redis:6379 -- foreman start
