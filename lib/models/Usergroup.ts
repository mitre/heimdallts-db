import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  BelongsToMany
} from "sequelize-typescript";
import { User } from "./User";
import { UserUsergroup } from "./UserUsergroup";

export type UsergroupType = "personal" | "team";

@Table({
  tableName: "usergroups"
})
export class Usergroup extends Model<Usergroup> {
  /** Denotes the name of this usergroup */
  @Column(DataType.STRING)
  name!: string;

  /** Denotes whether this is a group for a single user.
   * These "personal" groups simplify our role
   */
  @Column(DataType.STRING)
  type!: UsergroupType;

  @BelongsToMany(
    () => User,
    () => UserUsergroup
  )
  users?: User[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
