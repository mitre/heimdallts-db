import {Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt, DataType, AllowNull, HasMany, BelongsToMany} from 'sequelize-typescript';
import { AuthUserPass } from './AuthUserPass';
import { UserUsergroup } from './UserUserGroup';
import { Usergroup } from './Usergroup';

@DefaultScope(() => ({
  attributes: ['id', 'firstName', 'lastName', 'contactEmail', 'image', 'phoneNumber', 'createdAt', 'updatedAt'],
  // include: [AuthUserPass],
}))
@Table({
  tableName: 'users'
})
export class User extends Model<User> {
  /** The first name of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  firstName?: string | null;
 
  /** The last name of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  lastName?: string | null;

  /** The contact email of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  contactEmail?: string | null;

  /** The filepath to the profile image of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  image?: string | null;

  /** The phone number of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  phoneNumber?: string | null;

  /** The login(s) th */
  @HasMany(() => AuthUserPass, 'user_id')
  authUserPass?: AuthUserPass[];

  @BelongsToMany(() => Usergroup, () => UserUsergroup)
  usergroups?: User[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
