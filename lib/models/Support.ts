import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {Profile} from './Profile';

@DefaultScope(() => ({
  attributes: ['id', 'profile_id', 'name', 'value', 'createdAt', 'updatedAt']
}))
@Table
export class Support extends Model<Support> {

  @Column
  name!: string;

  @Column
  value!: string;

  @BelongsTo(() => Profile, 'profile_id')
  profile?: Profile | null = null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
