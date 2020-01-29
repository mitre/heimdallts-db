
import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt, AllowNull, DataType} from 'sequelize-typescript';
import { User } from './User';

@DefaultScope(() => ({
  where: {
    expired: false // Don't typically wan't inactive logins
  }
}))
@Table
@Table({
  tableName: 'evaluations',
})
export class AuthUserPass extends Model<AuthUserPass> {

  /** The username */
  @Column
  username!: string;

  /** The password, salted and hashed */
  @Column
  encryptedPassword!: string;

  /** Whether this user/pass has been expired, and needs to be re-assigned. */
  @Column 
  expired!: boolean;

  // @AllowNull(false)
  @BelongsTo(() => User, 'user_id')
  user?: User;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
