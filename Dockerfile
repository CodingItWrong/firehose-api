FROM ruby:2.7.1

# install node
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get update && \
    apt-get install -y nodejs

# install headless chrome
RUN apt-get install -y fonts-liberation \
                       libappindicator3-1 \
                       libasound2 \
                       libatk-bridge2.0-0 \
                       libatspi2.0-0 \
                       libdrm2 \
                       libgbm1 \
                       libgtk-3-0 \
                       libnspr4 \
                       libnss3 \
                       libx11-xcb1 \
                       libxcb-dri3-0 \
                       libxss1 \
                       libxtst6 \
                       xdg-utils
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome*.deb

# install other OS dependencies
RUN npm install -g yarn ember-cli
RUN gem install bundler
RUN gem install foreman

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
