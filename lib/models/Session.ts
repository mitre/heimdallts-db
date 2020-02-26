import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  BelongsToMany,
  AllowNull
} from "sequelize-typescript";
import { Usergroup } from "./Usergroup";
import { SessionUsergroup } from "./SessionUsergroup";

@Table({
  tableName: "sessions"
})
export class Session extends Model<Session> {
  @AllowNull(false)
  @Column
  key!: string;

  /** For logging purposes, the IP */
  @AllowNull(false)
  @Column
  ip!: string;

  /** Which usergroups are associated with this session?
   * These determine which resources the user will have access to.
   */
  @BelongsToMany(
    () => Usergroup,
    () => SessionUsergroup
  )
  other_usergroups?: Usergroup[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
