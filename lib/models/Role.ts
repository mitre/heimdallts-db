import {Column, Scopes, CreatedAt, Model, Table, UpdatedAt, DataType, AllowNull, HasMany, BelongsToMany} from 'sequelize-typescript';
import { UsergroupRole } from './UsergroupRole';
import { Usergroup } from './Usergroup';

@Scopes(() => ({
  usergroups: {
    include: [Usergroup]
  }
}))
@Table({
  tableName: 'roles'
})
export class Role extends Model<Role> {
  /** Denotes the name of this usergroup */
  @Column(DataType.STRING)
  name!: string;

  /** The usergroups which have access to this role */
  @BelongsToMany(() => Usergroup, () => UsergroupRole)
  usergroups?: Usergroup[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
