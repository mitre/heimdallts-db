import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  BelongsTo,
  BelongsToMany
} from "sequelize-typescript";
import { User } from "./User";
import { Usergroup } from "./Usergroup";
import { SessionUsergroup } from "./SessionUsergroup";

@Table({
  tableName: "sessions"
})
export class Session extends Model<Session> {
  @Column
  key!: string;

  /** For logging purposes, the IP */
  @Column
  ip!: string;

  /** Which usergroups are associated with this session?
   * These determine which resources the user will have access to.
   */
  @BelongsToMany(
    () => Usergroup,
    () => SessionUsergroup
  )
  usergroups?: Usergroup[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
