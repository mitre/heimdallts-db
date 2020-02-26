import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  AllowNull,
  ForeignKey,
  DataType
} from "sequelize-typescript";
import { Profile } from "./Profile";
import { Evaluation } from "./Evaluation";

@Table({
  tableName: "depends"
})
@Table
export class Depend extends Model<Depend> {
  @AllowNull(true)
  @Column(DataType.STRING)
  name!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  path!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  url!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  status!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  git!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  branch!: string | null;

  /** The profile which has/uses this dependency */
  @BelongsTo(() => Profile, { foreignKey: { allowNull: false } })
  profile?: Profile;

  @ForeignKey(() => Profile)
  profile_id!: number;

  /** The evaluation to which this specific dependency corresponds.
   * This is necessary due to the per-run nature of "status".
   * In theory, status should be broken out into DependStatus or somesuch, to preserve 3rd normal form
   */
  @BelongsTo(() => Evaluation, { foreignKey: { allowNull: false } })
  evaluation?: Evaluation;

  @ForeignKey(() => Evaluation)
  evaluation_id!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
