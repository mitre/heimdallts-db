import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType
} from "sequelize-typescript";
import { Profile } from "./Profile";

@Table({
  tableName: "groups"
})
export class Group extends Model<Group> {
  @Column
  title!: string;

  @Column
  control_id!: string;

  @Column(DataType.ARRAY(DataType.STRING))
  controls!: string[];

  @BelongsTo(() => Profile, "profile_id")
  profile?: Profile | null = null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
