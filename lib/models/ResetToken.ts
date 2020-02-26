import {
  Column,
  DefaultScope,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  BelongsTo,
  AllowNull,
  ForeignKey
} from "sequelize-typescript";
import { Op, fn } from "sequelize";
import { AuthUserPass } from "./AuthUserPass";

@DefaultScope(() => ({
  where: {
    expiration: {
      [Op.gt]: fn("NOW") // Don't want expired data
    }
  }
}))
@Table({
  tableName: "reset_tokens"
})
export class ResetToken extends Model<ResetToken> {
  @AllowNull(false) // Not strictly necessary but probably a good idea
  @Column(DataType.DATE)
  expiration!: Date;

  /** The token that must be provided to "activate" this auth key */
  @AllowNull(false)
  @Column
  token!: string;

  /** The auth this will reset */
  @BelongsTo(() => AuthUserPass, {
    foreignKey: {
      name: "auth_user_pass_id",
      allowNull: false
    }
  })
  auth_user_pass?: AuthUserPass;

  @ForeignKey(() => AuthUserPass)
  auth_user_pass_id!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
