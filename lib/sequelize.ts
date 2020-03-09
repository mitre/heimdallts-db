import { Sequelize } from "sequelize-typescript";

/** Initialize a sequelize connection to a heimdall database
 *
 * @param host The hostname to connect to. 'localhost' for local
 * @param port The port to connect to. 5432 is the default for heimdall DB / postgres
 * @param database The database name to connect to
 * @param username The username to authenticate with
 * @param password The password to authenticate with
 */
export function create_sequelize_connection(
  host: string,
  port: number,
  database: string,
  username: string,
  password: string,
  logging:
    | boolean
    | ((sql: string, timing?: number | undefined) => void)
    | undefined = undefined
): Sequelize {
  return new Sequelize({
    dialect: "postgres",
    database,
    username,
    password,
    host,
    port,
    logging,
    define: {
      paranoid: false,
      timestamps: true,
      underscored: true
    },
    models: [__dirname + "/models"]
  });
}
