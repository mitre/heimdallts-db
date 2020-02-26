import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  AllowNull,
  ForeignKey,
  DataType
} from "sequelize-typescript";
import { Profile } from "./Profile";

@Table({
  tableName: "supports"
})
export class Support extends Model<Support> {
  @AllowNull(true)
  @Column(DataType.STRING)
  os_name!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  os_family!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  platform!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  platform_family!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  platform_name!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  release!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  inspec_version!: string | null;

  @BelongsTo(() => Profile)
  profile?: Profile;

  @AllowNull(false)
  @ForeignKey(() => Profile)
  @Column
  profile_id!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
