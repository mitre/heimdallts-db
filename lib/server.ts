require('dotenv').config()
import {createServer} from 'http';
import {app} from './app';
import {sequelize} from './sequelize';

const port = process.env.PORT || 3000;

console.log("Database: " + process.env.DATABASE);

(async () => {
  await sequelize.sync({force: false});

  createServer(app)
    .listen(
      port,
      () => console.info(`Server running on port ${port}`)
    );
})();
