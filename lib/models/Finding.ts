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
  tableName: "findings"
})
export class Finding extends Model<Finding> {
  @AllowNull(false)
  @Column
  passed!: number;

  @AllowNull(false)
  @Column
  failed!: number;

  @AllowNull(false)
  @Column
  not_reviewed!: number;

  @AllowNull(false)
  @Column
  not_applicable!: number;

  @AllowNull(false)
  @Column
  profile_error!: number;

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
