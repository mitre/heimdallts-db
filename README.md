# sequelize-typescript-starter

## Installation
```
npm install
```

## Environment file
Create a file called `.env` to set local environment variables. Here is an example of its contents:
```
PORT=3000
DATABASE=heimdall_sequelize
DATABASE_USER=myuser
DATABASE_PASSWORD=mypassword
```

## Database Setup
In Postgres, create the database owned by `myuser`:
```
create database heimdall_sequelize with owner=myuser;
```

## Start server
```
npm start
```
