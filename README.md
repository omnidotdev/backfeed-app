# Backfeed

Backfeed is an open-source feedback reporting platform.

## Local Development

First, `cp .env.local.template .env.local` and fill in the values.

### Building and Running (Native)

#### Native

```sh
bun install
```

```sh
bun run dev
```

#### Container (for Production)

```sh
docker build -t backfeed-app .
```

```sh
docker run -p 3000:3000 backfeed-app
```

## License

The code in this repository is licensed under MIT, &copy; Brian Cooper and Omni LLC. See [LICENSE.md](LICENSE.md) for more information.
