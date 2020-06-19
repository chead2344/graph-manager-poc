# graph-manager-poc

## Overview

This is a simple implementation of a federated Apollo Graph using Graph Manager. There are two "implementing services" (products & reviews) and one federation gateway.

## Getting started

To run the services, copy the `.env.example` file in each package to a new file called `.env` and fill in the relevant values. An `APOLLO_KEY` can be obtained by logging into [Graph Manager](https://engine.apollographql.com/). Each service can be started using the command:

```sh
yarn dev
```

## Publishing schema changes

Changes to service schemas need to be published to [Graph Manager](https://engine.apollographql.com/) for the Gateway to pick them up. The Gateway automatically polls for changes every 30 seconds (see `experimental_pollInterval` option to cconfigure this). To publish schema changes for a particular service you must first run the service:

```sh
yarn dev
```

Then you can read the schema using introspection and push to [Graph Manager](https://engine.apollographql.com/) by running:

```sh
yarn push:schema
```

## Multiple environments

You can handle multiple environments/graph variants by appending the `--tag=<tag>` argument to the `push:schema` command.

## Known issues

When running the implementing services, the following error is shown in the terminal:

> It looks like you're running a federated schema and you've configured your service to report metrics to Apollo Graph Manager. You should only configure your Apollo gateway to report metrics to Apollo Graph Manager.

I cannot find a way to fix this but it does not seem to affect the query execcution at all.
