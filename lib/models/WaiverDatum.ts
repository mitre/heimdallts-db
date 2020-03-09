import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  ForeignKey,
  AllowNull,
  DataType
} from "sequelize-typescript";
import { Control } from "./Control";
import { Evaluation } from "./Evaluation";

@Table({
  tableName: "waiver_data"
})
export class WaiverDatum extends Model<WaiverDatum> {
  @AllowNull(true)
  @Column(DataType.STRING)
  justification!: string | null;

  @AllowNull(true)
  @Column(DataType.BOOLEAN)
  run!: boolean | null;

  @AllowNull(true)
  @Column(DataType.BOOLEAN)
  skipped_due_to_waiver!: boolean | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  message!: string | null;

  @BelongsTo(() => Control)
  control?: Control;

  @AllowNull(false)
  @ForeignKey(() => Control)
  @Column
  control_id!: number;

  @BelongsTo(() => Evaluation)
  evaluation?: Evaluation;

  @AllowNull(false)
  @ForeignKey(() => Evaluation)
  @Column
  evaluation_id!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
