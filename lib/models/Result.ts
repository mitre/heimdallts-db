import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  DataType,
  UpdatedAt,
  AllowNull,
  ForeignKey
} from "sequelize-typescript";
import { Control } from "./Control";
import { Evaluation } from "./Evaluation";

@Table({
  tableName: "results"
})
export class Result extends Model<Result> {
  @Column
  status!: string;

  @Column(DataType.TEXT)
  code_desc!: string;

  @Column
  skip_message!: string;

  @Column
  resource!: string;

  @Column(DataType.FLOAT)
  run_time!: number;

  @Column
  start_time!: Date;

  @Column(DataType.TEXT)
  message!: string;

  @Column
  exception!: string;

  @AllowNull(true)
  @Column(DataType.ARRAY(DataType.STRING))
  backtrace!: string[] | null;

  @BelongsTo(() => Control)
  control?: Control;

  @ForeignKey(() => Control)
  @AllowNull(false)
  @Column
  control_id!: number;

  @BelongsTo(() => Evaluation)
  evaluation?: Evaluation;

  @ForeignKey(() => Evaluation)
  @AllowNull(false)
  @Column
  evaluation_id!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
