import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  BelongsToMany
} from "sequelize-typescript";
import { User } from "./User";
import { EvaluationUsergroup } from "./EvaluationUsergroup";
import { Evaluation } from "./Evaluation";
import { Membership } from "./Membership";

export type UsergroupType = "personal" | "team" | "ad-hoc";

@Table({
  tableName: "usergroups"
})
export class Usergroup extends Model<Usergroup> {
  /** Denotes the name of this usergroup */
  @Column({
    type: DataType.STRING,
    unique: "group_title"
  })
  name!: string;

  /** Denotes whether this is a group for a single user.
   * These "personal" groups simplify our role
   */
  @Column({
    type: DataType.STRING,
    unique: "group_title"
  })
  type!: UsergroupType;

  /** Denotes who's in this group */
  @BelongsToMany(
    () => User,
    () => Membership
  )
  users?: Array<User & { Membership: Membership }>;

  @BelongsToMany(
    () => Evaluation,
    () => EvaluationUsergroup
  )
  evaluations?: Evaluation[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
