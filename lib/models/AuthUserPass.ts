import {
  BelongsTo,
  Column,
  DefaultScope,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  AllowNull,
  DataType,
  HasMany
} from "sequelize-typescript";
import { Op, fn } from "sequelize";
import { User } from "./User";
import { ResetToken } from "./ResetToken";

/*
@DefaultScope(() => ({
  where: {
    disabled: false, // Don't typically wan't inactive logins
    expiration: {
      [Op.gt]: fn("NOW") // Don't want expired data
    }
  }
}))
*/
@Table({
  tableName: "auths_user_pass"
})
export class AuthUserPass extends Model<AuthUserPass> {
  /** The username */
  @Column
  username!: string;

  /** The password, salted and hashed */
  @Column
  encrypted_password!: string;

  /** Whether this user/pass has been disabled, either manually or via password reset. */
  @Column
  disabled!: boolean;

  /** When, if ever, this password will expire natrually */
  @AllowNull(true)
  @Column(DataType.DATE)
  expiration?: Date | null;

  // @AllowNull(false)
  @BelongsTo(() => User, "user_id")
  user?: User;

  @HasMany(() => ResetToken, "auth_user_pass_id")
  reset_tokens?: ResetToken[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
