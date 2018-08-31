# Firehose

An open-source web app for link saving and sharing. Allows you to own and share your own content. See an example at [links.codingitwrong.com](https://links.codingitwrong.com)!

An [iOS share extension app](https://github.com/CodingItWrong/Hydrant) is also available.

## Getting Started

### Requirements

1. Ruby
1. PostgreSQL (e.g. [Postgres.app][postgres-app])
1. Redis
1. Ember-CLI
1. [Foreman][foreman] (optional, for running both Rails and Ember with one command)

### Setup

The project has two different `.env` files:

- The `.env` file at the root of the project is used by the Rails backend and includes connectivity info.
- The `frontend/.env` file is used by the Ember frontend and includes site branding.

Duplicate the `.env.sample` file at each location, rename it to `.env`, and fill in the values.

### Testing

To test both Rails and Ember

```sh
$ bin/test
```

To test them individually:

```sh
$ bin/rspec
$ cd frontend
$ ember test
```

### Running

For local development, the app is configured to run Rails and Ember on their default ports. You can run them both with a single command (requires Foreman):

```sh
$ bin/serve
```

Or run them individually as usual. In one terminal:

```sh
$ bin/rails s
```

And in another:

```sh
$ cd frontend
$ ember s
```

## Deployment

To prevent you from having to run separate servers for the Ember frontend and Rails API, we have configured the two in the following way:

- Ember builds its assets into the Rails public directory
- Rails serves the Ember app from all URLs except `/api/…`
- Ember makes API requests to the same host it's running on

This means you can deploy Firehose anywhere you can deploy a Rails app, with the exception that you need to run `ember build` first.

### Heroku

One easy way to deploy Firehose is Heroku. Hobby apps are free; they just have a limit on how many hours they can be running per day.

To deploy to Heroku, follow [Heroku’s instructions on deploying a Rails app](https://devcenter.heroku.com/articles/getting-started-with-rails5).

### Docker

A `Dockerfile` and `docker-compose.yml` file are included for running within Docker either locally or in deployment.

### Elsewhere

On any server, you can run `bin/production` upon each deployment to:

- Download Rails and Ember dependencies
- Build Ember
- Run Rails DB migrations
- Start the Rails server

## Attribution

“[Fire Hose](https://thenounproject.com/term/fire-hose/14726/)” by [Alv Jørgen Bovolden](https://thenounproject.com/Alvbovo/) is licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)

## License

Apache

[postgres-app]: http://postgresapp.com
[foreman]: https://github.com/ddollar/foreman
