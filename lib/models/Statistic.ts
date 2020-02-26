import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  AllowNull,
  ForeignKey
} from "sequelize-typescript";
import { Evaluation } from "./Evaluation";

@Table({
  tableName: "statistics"
})
export class Statistic extends Model<Statistic> {
  @AllowNull(false)
  @Column
  duration!: string;

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
