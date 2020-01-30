
import {Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt, DataType, AllowNull, HasMany, BelongsTo } from 'sequelize-typescript';
import {Op, fn} from 'sequelize';
import {User} from './User';
import {Role} from './Role';

@DefaultScope(() => ({
  where: {
    expiration: {
      [Op.gt]: fn('NOW') // Don't want expired data
    }
  }
}))
@Table({
  tableName: 'reset_tokens',
})
export class ResetToken extends Model<ResetToken> {
  @Column(DataType.DATE)
  expiration?: Date;

  @Column
  token!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
