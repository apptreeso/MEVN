# MEVN

## Run MongoDB

```
brew services start mongodb-community@4.2
```

## Run Mongo Shell

```
mongo
```

## Find Data on DB

```
show dbs
use meven_auth
show collections
> db.users.find().pretty()
```

## Project setup

```
npm install
```

### RUN NPM Only for Client

```
npm run client-install
```

### Run Both Server and Client Concurrently

```
npm run dev
```

### Run Only Server

```
npm run server
```

### Run Only Client

```
npm run client
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
