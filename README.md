# firehose-api

An open-source web service API for link saving and sharing. Allows you to own your data.

To make use of this API, you'll need a frontend. There is currently a [React web frontend](https://github.com/CodingItWrong/firehose-web) available.

An [iOS share extension app](https://github.com/CodingItWrong/Hydrant) is also available.

## Getting Started

### Requirements

1. Ruby
1. PostgreSQL (e.g. [Postgres.app][postgres-app])
1. Redis

### Setup

The `.env` file at the root of the project is used by the Rails backend and includes connectivity info. Duplicate the file `.env.sample`, rename it to `.env`, and fill in the values.

### Testing

```sh
$ bin/rspec
```

### Running

```sh
$ bin/serve
```

## Deployment

One easy way to deploy Firehose is Heroku. There is a Free tier whose only limit is that the app sleeps after 30 minutes of inactivity.

To deploy to Heroku, follow [Heroku’s instructions on deploying a Rails app](https://devcenter.heroku.com/articles/getting-started-with-rails5).

## Attribution

“[Fire Hose](https://thenounproject.com/term/fire-hose/14726/)” by [Alv Jørgen Bovolden](https://thenounproject.com/Alvbovo/) is licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)

## License

Apache

[postgres-app]: http://postgresapp.com
[foreman]: https://github.com/ddollar/foreman
