
import {Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt, DataType, AllowNull, HasMany, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import {Op, fn} from 'sequelize';
import {User} from './User';
import {Role} from './Role';
import { SessionRole } from './SessionRole';

@DefaultScope(() => ({
  where: {
    expiration: {
      [Op.gt]: fn('NOW') // Don't want expired data
    }
  }
}))
@Table({
  tableName: 'sessions',
})
export class Session extends Model<Session> {
  @Column(DataType.DATE)
  expiration!: Date;

  @Column
  key!: string;

  @BelongsTo(() => User, 'user_id')
  user?: User;

  /** The role the session */
  @BelongsToMany(() => Role, () => SessionRole)
  roles?: Role[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
