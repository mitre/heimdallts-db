import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {Profile} from './Profile';

@Table({
  tableName: 'supports'
})
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
