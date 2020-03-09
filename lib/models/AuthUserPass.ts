import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  AllowNull,
  DataType,
  HasMany,
  ForeignKey,
  Unique
} from "sequelize-typescript";
//import { Op, fn } from "sequelize";
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
  @Unique(true)
  @AllowNull(false)
  @Column
  username!: string;

  /** The password, salted and hashed */
  @AllowNull(false)
  @Column
  encrypted_password!: string;

  /** Whether this user/pass has been disabled, either manually or via password reset. */
  @AllowNull(false)
  @Column
  disabled!: boolean;

  /** When, if ever, this password will expire natrually */
  @AllowNull(true)
  @Column(DataType.DATE)
  expiration?: Date | null;

  /** The user which owns this auth key */
  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id!: number;

  /** Reset tokens which can be used to disable this auth-user-pass */
  @HasMany(() => ResetToken)
  reset_tokens?: ResetToken[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
