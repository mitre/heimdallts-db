
import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt, AllowNull, DataType} from 'sequelize-typescript';
import { User } from './User';

@DefaultScope(() => ({
  attributes: ['id', 'user_id', 'username', 'encryptedPassword', 'active', 'createdAt', 'updatedAt'],
  // include: [User],
  where: {
    active: true // Don't typically wan't inactive logins
  }
}))
@Table({
  tableName: "auths_user_pass"
})
export class AuthUserPass extends Model<AuthUserPass> {
  // @AllowNull(false)
  @BelongsTo(() => User, 'user_id')
  user!: User;

  @Column
  userId!: number;

  @Column
  username!: string;

  @Column
  encryptedPassword!: string;

  @Column 
  active!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
