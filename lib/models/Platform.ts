import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  AllowNull,
  DataType,
  ForeignKey
} from "sequelize-typescript";
import { Evaluation } from "./Evaluation";

@Table({
  tableName: "platforms"
})
export class Platform extends Model<Platform> {
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  release!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  target_id!: string | null;

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
