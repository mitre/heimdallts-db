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
  BeforeCreate
} from "sequelize-typescript";
import { Op, fn } from "sequelize";
import { User } from "./User";
import { Usergroup } from "./Usergroup";

@DefaultScope(() => ({
  where: {
    expiration: {
      [Op.gt]: fn("NOW") // Don't want expired data
    }
  }
}))
@Table({
  tableName: "api_keys"
})
export class ApiKey extends Model<ApiKey> {
  @AllowNull(true)
  @Column(DataType.DATE)
  expiration?: Date | null;

  /** The actual JWT api key */
  @Column
  key!: string;

  /** The user-facing label for this key */
  @Column
  name!: string;

  /** The usergroup to which this api-key provides access.
   * This API key will have all auth grants given to this usergroup.
   * If null, all usergroups owned by the user will be available
   */
  @BelongsTo(() => Usergroup, {
    foreignKey: {
      allowNull: true,
      name: "role_id"
    }
  })
  usergroup?: Usergroup;

  /**
   * The user to which this api-key corresponds. Also denotes the creator.
   */
  @BelongsTo(() => User, {
    foreignKey: {
      allowNull: false,
      name: "user_id"
    }
  })
  user?: User;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
