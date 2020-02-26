import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  AllowNull,
  ForeignKey
} from "sequelize-typescript";
import { Evaluation } from "./Evaluation";
import { Profile } from "./Profile";

@Table({
  tableName: "inputs"
})
export class Input extends Model<Input> {
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column(DataType.JSONB)
  options!: unknown;

  @BelongsTo(() => Profile)
  profile?: Profile;

  @AllowNull(false)
  @ForeignKey(() => Profile)
  @Column
  profile_id!: number;

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
