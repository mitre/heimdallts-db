import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt, DataType} from 'sequelize-typescript';
import {Profile} from './Profile';

@DefaultScope(() => ({
  attributes: ['id', 'profile_id', 'title', 'control_id', 'controls', 'createdAt', 'updatedAt']
}))
@Table
export class Group extends Model<Group> {

  @Column
  title!: string;

  @Column
  control_id!: string;

  @Column(DataType.ARRAY(DataType.STRING))
  controls!: string[];

  @BelongsTo(() => Profile, 'profile_id')
  profile?: Profile | null = null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
