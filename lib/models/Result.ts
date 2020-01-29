import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, DataType, UpdatedAt} from 'sequelize-typescript';
import {Control} from './Control';
import {Evaluation} from './Evaluation';

@Table({
  tableName: 'results',
})
export class Result extends Model<Result> {

  @Column
  status!: string;

  @Column
  code_desc!: string;

  @Column
  skip_message!: string;

  @Column
  resource!: string;

  @Column(DataType.FLOAT)
  run_time!: number;

  @Column
  start_time!: Date;

  @Column
  message!: string;

  @Column
  exception!: string;

  @Column(DataType.ARRAY(DataType.STRING))
  backtrace: string[] | null = null;

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
