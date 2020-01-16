import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt, DataType} from 'sequelize-typescript';
import {Evaluation} from './Evaluation';
import {Profile} from './Profile';

@DefaultScope(() => ({
  attributes: ['id', 'evaluation_id', 'profile_id', 'name', 'options', 'createdAt', 'updatedAt']
}))
@Table
export class Input extends Model<Input> {

  @Column
  name!: string;

  @Column(DataType.JSONB)
  options!: unknown;

  @BelongsTo(() => Profile, 'profile_id')
  profile?: Profile | null = null;

  @BelongsTo(() => Evaluation, 'evaluation_id')
  evaluation?: Evaluation | null = null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
