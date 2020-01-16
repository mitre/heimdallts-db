import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {Evaluation} from './Evaluation';

@DefaultScope(() => ({
  attributes: ['id', 'duration', 'createdAt', 'updatedAt']
}))
@Table({
  timestamps: true,
  underscored: true,
  paranoid: false,
  tableName: 'statistics',
})
export class Statistic extends Model<Statistic> {

  @Column
  duration!: string;

  @BelongsTo(() => Evaluation, 'evaluation_id')
  evaluation?: Evaluation | null = null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
