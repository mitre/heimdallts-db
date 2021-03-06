import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  ForeignKey
} from "sequelize-typescript";
import { Control } from "./Control";

@Table({
  tableName: "refs"
})
export class Ref extends Model<Ref> {
  @Column
  ref!: string;

  @Column
  url!: string;

  @Column
  uri!: string;

  @BelongsTo(() => Control)
  control?: Control;

  @ForeignKey(() => Control)
  control_id!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
