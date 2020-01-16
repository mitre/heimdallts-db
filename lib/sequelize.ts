require('dotenv').config()
import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.DATABASE,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  define: {
    paranoid: false,
    timestamps: true,
    underscored: true,
  },
  models: [__dirname + '/models']
});
