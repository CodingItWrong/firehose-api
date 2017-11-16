FROM ruby:2.4.2

RUN apt-get update
RUN apt-get install -y nodejs
RUN gem install nokogiri

RUN mkdir /myapp
WORKDIR /myapp
ADD Gemfile /myapp/Gemfile
ADD Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
ADD . /myapp

ENV RAILS_ENV=production
ENV RAILS_LOG_TO_STDOUT=true
env RAILS_SERVE_STATIC_FILES=true

EXPOSE 3000

CMD bin/docker-start
