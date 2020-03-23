import {
  Model,
  Column,
  Table,
  ForeignKey,
  AllowNull,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasOne,
  PrimaryKey,
  Unique,
  BelongsTo,
  AutoIncrement
} from "sequelize-typescript";
import { User } from "./User";
import { Usergroup } from "./Usergroup";
import { ApiKey } from "./ApiKey";

/** The Owner can manage attributes of the team itself, and add admins, users, and guests of any other subtype.
 * It can transfer ownership to another member of the group.
 * It can add and remove admins.
 * It can add and remove users or guests.
 * It can view all evaluations in the group.
 * It can create saved filters on the group.
 *
 * Admin can add and remove users or guests.
 * They can view all evaluations in the group.
 * They can create saved filters on the group.
 *
 * Users can add or remove evaluations.
 * They can view all evaluations in the group.
 * They can create saved filters on the group.
 *
 * Guests can view all evaluations in the group. They can create saved filters on the group.
 */
export type MembershipType = "owner" | "admin" | "user" | "guest";

@Table({
  tableName: "memberships"
})
export class Membership extends Model<Membership> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  // The binding between the the User and Usergroup that this establishes
  @BelongsTo(() => User)
  user?: User;

  @Unique("mn")
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  user_id!: number;

  @BelongsTo(() => Usergroup)
  usergroup?: Usergroup;

  @Unique("mn")
  @AllowNull(false)
  @ForeignKey(() => Usergroup)
  @Column
  usergroup_id!: number;

  // What type of user this is in this group
  @AllowNull(false)
  @Column(DataType.STRING)
  type!: MembershipType;

  // The issued API key record ID, if one exists
  // @AllowNull(true)
  @HasOne(() => ApiKey)
  api_key?: ApiKey;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
