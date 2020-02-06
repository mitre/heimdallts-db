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
  tableName: "statistics"
})
export class Statistic extends Model<Statistic> {
  @Column
  duration!: string;

  @BelongsTo(() => Evaluation, "evaluation_id")
  evaluation?: Evaluation | null = null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
