import {
  Column,
  DefaultScope,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  AllowNull,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";
import { Op, fn } from "sequelize";
import { User } from "./User";
import { Usergroup } from "./Usergroup";

/*
@DefaultScope(() => ({
  where: {
    expiration: {
      [Op.gt]: fn("NOW") // Don't want expired data
    }
  }
})) */
@Table({
  tableName: "api_keys"
})
export class ApiKey extends Model<ApiKey> {
  @AllowNull(true)
  @Column(DataType.DATE)
  expiration?: Date | null;

  /** The actual JWT api key */
  @AllowNull(false)
  @Column
  key!: string;

  /** The user-facing label for this key */
  @AllowNull(false)
  @Column
  name!: string;

  /** The usergroup to which this api-key provides access.
   * This API key will have all auth grants given to this usergroup.
   * If null, all usergroups owned by the user will be available
   */
  @BelongsTo(() => Usergroup)
  usergroup?: Usergroup | null;

  @ForeignKey(() => Usergroup)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  usergroup_id!: number | null;

  /**
   * The user to which this api-key corresponds. Also denotes the creator.
   */
  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number;

  // Standard createdat/updatedat
  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
