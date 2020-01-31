
import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt, AllowNull, DataType, HasMany} from 'sequelize-typescript';
import { User } from './User';
import { ResetToken } from './ResetToken';

@DefaultScope(() => ({
  where: {
    expired: false // Don't typically wan't inactive logins
  }
}))
@Table({
  tableName: 'auths_user_pass',
})
export class AuthUserPass extends Model<AuthUserPass> {

  /** The username */
  @Column
  username!: string;

  /** The password, salted and hashed */
  @Column
  encrypted_password!: string;

  /** Whether this user/pass has been expired, and needs to be re-assigned. */
  @Column 
  expired!: boolean;

  // @AllowNull(false)
  @BelongsTo(() => User, 'user_id')
  user?: User;

  @HasMany(() => ResetToken, 'auth_user_pass_id')
  reset_tokens?: ResetToken[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
