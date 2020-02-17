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
  tableName: "platforms"
})
export class Platform extends Model<Platform> {
  @Column
  name!: string;

  @Column
  release!: string;

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
