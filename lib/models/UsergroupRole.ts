import { Model, Column, Table, ForeignKey } from "sequelize-typescript";
import { Usergroup } from "./Usergroup";
import { Role } from "./Role";

@Table({
  timestamps: false,
  tableName: "usergroups_roles"
})
export class UsergroupRole extends Model<UsergroupRole> {
  @ForeignKey(() => Usergroup)
  @Column
  usergroupId!: number;

  @ForeignKey(() => Role)
  @Column
  roleId!: number;
}
