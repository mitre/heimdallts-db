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
  tableName: "source_locations"
})
export class SourceLocation extends Model<SourceLocation> {
  @Column
  ref!: string;

  @Column
  line!: number;

  @BelongsTo(() => Control, "control_id")
  control?: Control | null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
