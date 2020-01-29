import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {Profile} from './Profile';

@Table({
  tableName: 'depends',
})
@Table
export class Depend extends Model<Depend> {

  @Column
  name!: string;

  @Column
  path!: string;

  @Column
  url!: string;

  @Column
  status!: string;

  @Column
  git!: string;

  @Column
  branch!: string;

  @BelongsTo(() => Profile, 'profile_id')
  profile?: Profile | null = null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
