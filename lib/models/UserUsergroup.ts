import { Model, Column, Table, ForeignKey } from "sequelize-typescript";
import { User } from "./User";
import { Usergroup } from "./Usergroup";

@Table({
  timestamps: false,
  tableName: "users_usergroups"
})
export class UserUsergroup extends Model<UserUsergroup> {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Usergroup)
  @Column
  usergroupId!: number;
}
