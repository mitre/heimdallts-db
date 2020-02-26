import {
  Model,
  Column,
  Table,
  ForeignKey,
  AllowNull
} from "sequelize-typescript";
import { Session } from "./Session";
import { Usergroup } from "./Usergroup";

@Table({
  timestamps: false,
  tableName: "sessions_usergroups"
})
export class SessionUsergroup extends Model<SessionUsergroup> {
  @AllowNull(false)
  @ForeignKey(() => Session)
  @Column
  sessionId!: number;

  @AllowNull(false)
  @ForeignKey(() => Usergroup)
  @Column
  usergroupId!: number;
}
