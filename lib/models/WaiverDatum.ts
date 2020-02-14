import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt
} from "sequelize-typescript";
import { Control } from "./Control";
import { Evaluation } from "./Evaluation";

@Table({
  tableName: "waiver_data"
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
