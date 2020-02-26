import {
  Model,
  Column,
  Table,
  ForeignKey,
  AllowNull
} from "sequelize-typescript";
import { User } from "./User";
import { Usergroup } from "./Usergroup";

@Table({
  timestamps: false,
  tableName: "users_usergroups"
})
export class UserUsergroup extends Model<UserUsergroup> {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @AllowNull(false)
  @ForeignKey(() => Usergroup)
  @Column
  usergroupId!: number;
}
