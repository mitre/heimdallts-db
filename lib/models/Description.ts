import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  ForeignKey,
  AllowNull
} from "sequelize-typescript";
import { Control } from "./Control";

@Table({
  tableName: "descriptions"
})
export class Description extends Model<Description> {
  @AllowNull(false)
  @Column
  label!: string;

  @AllowNull(false)
  @Column
  data!: string;

  @BelongsTo(() => Control)
  control?: Control;

  @ForeignKey(() => Control)
  @AllowNull(false)
  @Column
  control_id!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
