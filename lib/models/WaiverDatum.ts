import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {Control} from './Control';
import {Evaluation} from './Evaluation';

@DefaultScope(() => ({
  attributes: ['id', 'justification', 'run', 'skipped_due_to_waiver', 'message', 'createdAt', 'updatedAt']
}))
@Table({
  timestamps: true,
  underscored: true,
  paranoid: false,
  tableName: 'waiver_data',
})
export class WaiverDatum extends Model<WaiverDatum> {

  @Column
  justification!: string;

  @Column
  run!: boolean;

  @Column
  skipped_due_to_waiver!: boolean;

  @Column
  message!: string;

  @BelongsTo(() => Control, 'control_id')
  control?: Control | null = null;

  @BelongsTo(() => Evaluation, 'evaluation_id')
  evaluation?: Evaluation | null = null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
