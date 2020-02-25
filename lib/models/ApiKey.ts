import {
  Column,
  DefaultScope,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  AllowNull,
  BelongsTo
} from "sequelize-typescript";
import { Op, fn } from "sequelize";
import { User } from "./User";
import { Role } from "./Role";

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

  @Column
  key!: string;

  /** The user-facing label for this key */
  @Column
  name!: string;

  /** The role to which this api-key provides access. If null, provides full user access. */
  @BelongsTo(() => Role, {
    foreignKey: {
      allowNull: true,
      name: "role_id"
    }
  })
  role?: Role;

  /** The user which created this key */
  @BelongsTo(() => User, "user_id")
  user?: User;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
