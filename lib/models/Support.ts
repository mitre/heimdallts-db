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
  name!: string;

  @Column
  value!: string;

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
