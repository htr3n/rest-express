# REST API with [Express](https://expressjs.com) on [NodeJS](https://nodejs.org) and [TypeScript](https://www.typescriptlang.org) and [mongodb-memory-server](https://nodkz.github.io/mongodb-memory-server)

## Getting Started

### Install Dependencies

```sh
yarn install

# or

npm install
```

### Build

```sh
yarn build

# or

npm run build
```

## REST API Usage

### Create a new user

```sh
curl -X POST http://127.0.0.1:8000/users \
  --header 'Content-Type: application/json' \
  --data '{"firstName":"Jane", "lastName": "Doe", "email": "j.doe@example.com"}'
```

### Retrieve an existing user

```sh
curl -X GET http://127.0.0.1:8000/users/123
```

### Update an existing user

```sh
curl -X PUT http://127.0.0.1:8000/users/123 \
  --header 'Content-Type: application/json' \
  --data '{"firstName":"Alice", "lastName": "Wonderland", "email": "a.wonderland@example.com"}'
```

### Delete an existing user

```sh
curl -X DELETE http://127.0.0.1:8000/users/123
```

## License

[MIT License](LICENSE)
