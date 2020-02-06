import {
  Column,
  Scopes,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  BelongsToMany
} from "sequelize-typescript";
import { UsergroupRole } from "./UsergroupRole";
import { Usergroup } from "./Usergroup";
import { Session } from "./Session";
import { SessionRole } from "./SessionRole";

@Scopes(() => ({
  usergroups: {
    include: [Usergroup]
  }
}))
@Table({
  tableName: "roles"
})
export class Role extends Model<Role> {
  /** Denotes the name of this usergroup */
  @Column(DataType.STRING)
  name!: string;

  /** The usergroups which have access to this role */
  @BelongsToMany(
    () => Usergroup,
    () => UsergroupRole
  )
  usergroups?: Usergroup[];

  /** The active sessions on this role */
  @BelongsToMany(
    () => Session,
    () => SessionRole
  )
  active_sessions?: Session[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
