import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  AllowNull,
  HasMany,
  BelongsToMany
} from "sequelize-typescript";
import { AuthUserPass } from "./AuthUserPass";
import { UserUsergroup } from "./UserUsergroup";
import { Usergroup } from "./Usergroup";

@Table({
  tableName: "users"
})
export class User extends Model<User> {
  /** The first name of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  firstName?: string | null = null;

  /** The last name of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  lastName?: string | null = null;

  /** The contact email of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  contactEmail?: string | null = null;

  /** The filepath to the profile image of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  image?: string | null = null;

  /** The phone number of the user */
  @AllowNull(true)
  @Column(DataType.STRING)
  phoneNumber?: string | null = null;

  /** The login(s) th */
  @HasMany(() => AuthUserPass, "user_id")
  authUserPass?: AuthUserPass[];

  @BelongsToMany(
    () => Usergroup,
    () => UserUsergroup
  )
  usergroups?: Usergroup[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
