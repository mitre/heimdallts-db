import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt
} from "sequelize-typescript";
import { Profile } from "./Profile";

@Table({
  tableName: "supports"
})
export class Support extends Model<Support> {
  @Column
  os_name!: string;

  @Column
  os_family!: string;

  @Column
  platform!: string;

  @Column
  platform_family!: string;

  @Column
  platform_name!: string;

  @Column
  release!: string;

  @Column
  inspec_version!: string;

  @BelongsTo(() => Profile, {
    foreignKey: {
      name: "profile_id",
      allowNull: false
    }
  })
  profile?: Profile;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
