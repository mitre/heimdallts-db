# heimdallts-db

## Installation
```
npm install
```

## Environment variables
This API depends on local environment variables. Some of the variables are for connecting to an existing Heimdall Postgres database. Here's an example of setting these variables with connection settings for a local Heimdall development database:
```
export DATABASE=heimdall_postgres_development
export DATABASE_USER=myuser
export DATABASE_PASSWORD=mypass
export JWT_SECRET=secret
```

## Database Setup
This API is meant to connect to an existing Heimdall database. If you want to setup a new database for development purposes, use these steps.

In Postgres, create the database owned by `myuser`:
```
create database heimdall_sequelize with owner=myuser;
```

Export the database variables as shown above. When the server is started it will create the tables if they don't already exist.

## Start server
```
npm run start:dev
```
