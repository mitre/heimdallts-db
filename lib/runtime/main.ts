require("dotenv").config();
import { createServer } from "http";
import { app } from "./express";
import { create_sequelize_connection } from "../sequelize";
import "process";
import { Sequelize } from "sequelize";

let sequelize!: Sequelize;
if (
  process.env.DATABASE &&
  process.env.DATABASE_USER &&
  process.env.DATABASE_PASSWORD
) {
  sequelize = create_sequelize_connection(
    "localhost",
    5432,
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD
  );
} else {
  console.error(
    "Must set env flags DATABASE, DATABASE_USER, DATABASE_PASSWORD"
  );
  process.exit(1);
}

const port = process.env.PORT || 3030;

console.info("Database: " + process.env.DATABASE);

async function main(): Promise<void> {
  await sequelize.sync({ force: false });

  createServer(app).listen(port, () =>
    console.info(`Server running on port ${port}`)
  );
}
main();
