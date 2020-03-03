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
import { Profile } from "./Profile";

@Table({
  tableName: "groups"
})
export class Group extends Model<Group> {
  @AllowNull(true)
  @Column(DataType.TEXT)
  title!: string | null;

  @AllowNull(false)
  @Column(DataType.STRING)
  control_id!: string;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  controls!: string[];

  /** The profile that contains this group */
  @BelongsTo(() => Profile)
  profile?: Profile;

  @ForeignKey(() => Profile)
  @AllowNull(false)
  @Column
  profile_id!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
