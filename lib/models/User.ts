import {Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt, DataType, AllowNull, HasMany} from 'sequelize-typescript';
import { AuthUserPass } from './AuthUserPass';

@DefaultScope(() => ({
  attributes: ['id', 'firstName', 'lastName', 'contactEmail', 'image', 'phoneNumber', 'createdAt', 'updatedAt'],
  include: [AuthUserPass],
}))
@Table
export class User extends Model<User> {
  @AllowNull(true)
  @Column(DataType.STRING)
  firstName?: string | null;
 
  @AllowNull(true)
  @Column(DataType.STRING)
  lastName?: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  contactEmail?: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  image?: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  phoneNumber?: string | null;

  @HasMany(() => AuthUserPass, "user_id")
  auth_user_pass?: AuthUserPass;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
