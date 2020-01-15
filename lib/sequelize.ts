import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'heimdall_sequelize',
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  define: {
    paranoid: false,
    timestamps: true,
    underscored: true,
  },
  models: [__dirname + '/models']
});
