import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt
} from "sequelize-typescript";
import { Control } from "./Control";

@Table({
  tableName: "descriptions"
})
export class Description extends Model<Description> {
  @Column
  label!: string;

  @Column
  data!: string;

  @BelongsTo(() => Control, {
    foreignKey: {
      name: "control_id",
      allowNull: false
    }
  })
  control?: Control;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
