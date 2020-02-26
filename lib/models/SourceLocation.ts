import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  ForeignKey,
  AllowNull,
  DataType
} from "sequelize-typescript";
import { Control } from "./Control";

@Table({
  tableName: "source_locations"
})
export class SourceLocation extends Model<SourceLocation> {
  @AllowNull(true)
  @Column(DataType.STRING)
  ref!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  line!: number;

  @BelongsTo(() => Control)
  control!: Control;

  @AllowNull(false)
  @ForeignKey(() => Control)
  @Column
  control_id!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
