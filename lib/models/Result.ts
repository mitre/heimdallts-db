import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  DataType,
  UpdatedAt,
  AllowNull
} from "sequelize-typescript";
import { Control } from "./Control";
import { Evaluation } from "./Evaluation";

@Table({
  tableName: "results"
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

  @AllowNull(true)
  @Column(DataType.ARRAY(DataType.STRING))
  backtrace: string[] | null = null;

  @BelongsTo(() => Control, {
    foreignKey: {
      name: "control_id",
      allowNull: false
    }
  })
  control?: Control;

  @BelongsTo(() => Evaluation, {
    foreignKey: {
      name: "evaluation_id",
      allowNull: false
    }
  })
  evaluation?: Evaluation;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
