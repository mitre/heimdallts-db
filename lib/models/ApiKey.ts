import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  AllowNull,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";
import { Membership } from "./Membership";

@Table({
  tableName: "api_keys"
})
export class ApiKey extends Model<ApiKey> {
  @AllowNull(true)
  @Column(DataType.DATE)
  expiration?: Date | null;

  /** The actual JWT api key */
  @AllowNull(false)
  @Column
  key!: string;

  /** The user-facing label for this key */
  // @AllowNull(false)
  // @Column
  // name!: string;

  /** The usergroup membership to which this api-key provides access.
   * It is bound via user-usergroup to ensure that it only has the priveleges bestowed of the user who created it
   */
  @BelongsTo(() => Membership)
  membership?: Membership;

  @AllowNull(false)
  @ForeignKey(() => Membership)
  @Column
  membership_id!: number;

  // Standard createdat/updatedat
  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
