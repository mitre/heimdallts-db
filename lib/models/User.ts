import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  AllowNull,
  HasMany,
  BelongsToMany,
  IsEmail,
  Unique
} from "sequelize-typescript";
import { AuthUserPass } from "./AuthUserPass";
import { Membership } from "./Membership";
import { Usergroup } from "./Usergroup";
import { Evaluation } from "./Evaluation";

@Table({
  tableName: "users"
})
export class User extends Model<User> {
  /** The first name of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  first_name!: string | null;

  /** The last name of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  last_name!: string | null;

  /** The contact email of the user */
  @IsEmail
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  /** The filepath to the profile image of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  image!: string | null;

  /** The phone number of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  phone_number!: string | null;

  /** The login(s) that we host locally to provide access to this account */
  @HasMany(() => AuthUserPass, { onDelete: "CASCADE" })
  auth_user_pass?: AuthUserPass[];

  /** The usergroups this user belongs to */
  @BelongsToMany(
    () => Usergroup,
    () => Membership
  )
  usergroups?: Array<Usergroup & { Membership: Membership }>;

  /** The evaluations which are directly owned by this user */
  // @HasMany(() => Evaluation)
  // evaluations?: Evaluation[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
