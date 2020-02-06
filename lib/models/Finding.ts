import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt
} from "sequelize-typescript";
import { Evaluation } from "./Evaluation";

@Table({
  tableName: "findings"
})
export class Finding extends Model<Finding> {
  @Column
  passed!: number;

  @Column
  failed!: number;

  @Column
  not_reviewed!: number;

  @Column
  not_applicable!: number;

  @Column
  profile_error!: number;

  @BelongsTo(() => Evaluation, "evaluation_id")
  evaluation?: Evaluation | null = null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
