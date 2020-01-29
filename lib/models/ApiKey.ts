import {Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt, DataType, AllowNull, HasMany, BelongsTo, } from 'sequelize-typescript';
import {User} from './User';
import {Role} from './Role';
import { Op } from 'sequelize/types';

@DefaultScope(() => ({
  where: {
    expiration: {
      [Op.gt]: new Date()
    }
  }
}))
@Table({
  tableName: 'depends',
})
@Table
export class ApiKey extends Model<ApiKey> {
  @AllowNull(true)
  @Column(DataType.DATE)
  expiration?: Date | null;

  @Column
  key!: string;

  @BelongsTo(() => User, 'user_id')
  user?: User;

  @BelongsTo(() => Role, 'role_id')
  role?: Role;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
