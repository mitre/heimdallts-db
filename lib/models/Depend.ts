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
  tableName: "depends"
})
@Table
export class Depend extends Model<Depend> {
  @Column
  name!: string;

  @Column
  path!: string;

  @Column
  url!: string;

  @Column
  status!: string;

  @Column
  git!: string;

  @Column
  branch!: string;

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
