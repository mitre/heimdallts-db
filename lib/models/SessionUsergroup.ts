import { Model, Column, Table, ForeignKey } from "sequelize-typescript";
import { Session } from "./Session";
import { Usergroup } from "./Usergroup";

@Table({
  timestamps: false,
  tableName: "sessions_usergroups"
})
export class SessionUsergroup extends Model<SessionUsergroup> {
  @ForeignKey(() => Session)
  @Column
  sessionId!: number;

  @ForeignKey(() => Usergroup)
  @Column
  usergroupId!: number;
}
