import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  BelongsToMany
} from "sequelize-typescript";
import { Role } from "./Role";
import { User } from "./User";
import { UserUsergroup } from "./UserUsergroup";
import { UsergroupRole } from "./UsergroupRole";

@Table({
  tableName: "usergroups"
})
export class Usergroup extends Model<Usergroup> {
  /** Denotes the name of this usergroup */
  @Column(DataType.STRING)
  name!: string;

  /** Denotes whether this is a group for a single user */
  @Column(DataType.BOOLEAN)
  personal!: boolean;

  @BelongsToMany(
    () => Role,
    () => UsergroupRole
  )
  roles?: Role[];

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
