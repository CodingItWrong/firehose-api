FROM ruby:2.4.3

RUN apt-get update && \
    apt-get install -y nodejs
RUN gem install foreman

RUN mkdir /myapp
WORKDIR /myapp

COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install

COPY . /myapp
RUN bin/rails assets:precompile

ENV RAILS_ENV=production
ENV RAILS_LOG_TO_STDOUT=true
ENV RAILS_SERVE_STATIC_FILES=true

EXPOSE 3000

CMD bin/rails db:create db:migrate && \
    bin/wait-for-it.sh redis:6379 -- foreman start
