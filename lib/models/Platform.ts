import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {Evaluation} from './Evaluation';

@Table({
  tableName: 'platforms',
})
export class Platform extends Model<Platform> {

  @Column
  name!: string;

  @Column
  release!: string;

  @BelongsTo(() => Evaluation, 'evaluation_id')
  evaluation?: Evaluation | null = null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
