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

## NOTICE  

© 2018 The MITRE Corporation.  

Approved for Public Release; Distribution Unlimited. Case Number 18-3678.    

## NOTICE 

MITRE hereby grants express written permission to use, reproduce, distribute, modify, and otherwise leverage this software to the extent permitted by the licensed terms provided in the LICENSE.md file included with this project.

## NOTICE  

This software was produced for the U. S. Government under Contract Number HHSM-500-2012-00008I, and is subject to Federal Acquisition Regulation Clause 52.227-14, Rights in Data-General.    

No other use other than that granted to the U. S. Government, or to those acting on behalf of the U. S. Government under that Clause is authorized without the express written permission of The MITRE Corporation.   

For further information, please contact The MITRE Corporation, Contracts Management Office, 7515 Colshire Drive, McLean, VA  22102-7539, (703) 983-6000.  

## NOTICE

DISA STIGs are published by DISA IASE, see: https://iase.disa.mil/Pages/privacy_policy.aspx
```
