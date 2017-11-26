FROM ruby:2.4.2

RUN apt-get update && \
    apt-get install -y nodejs
RUN gem install nokogiri -v 1.8.1

RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install

ENV RAILS_ENV=production
ENV RAILS_LOG_TO_STDOUT=true
env RAILS_SERVE_STATIC_FILES=true

EXPOSE 3000

CMD bin/docker-start
