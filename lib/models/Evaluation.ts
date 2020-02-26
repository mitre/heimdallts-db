import {
  Model,
  Column,
  Table,
  HasOne,
  HasMany,
  BelongsToMany,
  Scopes,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  AllowNull,
  DataType
} from "sequelize-typescript";
import { Profile } from "./Profile";
import { EvaluationProfile } from "./EvaluationProfile";
import { Statistic } from "./Statistic";
import { Platform } from "./Platform";
import { Input } from "./Input";
import { Tag } from "./Tag";
import { Finding } from "./Finding";
import { WaiverDatum } from "./WaiverDatum";
import { Result } from "./Result";
import { Depend } from "./Depend";
import { User } from "./User";
import { Usergroup } from "./Usergroup";

@Scopes(() => ({
  short: {},
  meta: {
    include: [Statistic, Platform, Finding, Tag]
  }
}))
@Table({
  tableName: "evaluations"
})
export class Evaluation extends Model<Evaluation> {
  @Column
  version!: string;

  @HasOne(() => Statistic, { onDelete: "CASCADE" })
  statistic?: Statistic;

  @HasOne(() => Platform, { onDelete: "CASCADE" })
  platform?: Platform;

  @HasOne(() => Depend, { onDelete: "CASCADE" })
  depend?: Depend;

  @HasMany(() => Input, { onDelete: "CASCADE" })
  inputs?: Input[];

  @HasMany(() => Tag, {
    foreignKey: "tagger_id",
    scope: { tagger_type: "Evaluation" }
  })
  tags?: Tag[];

  @HasMany(() => WaiverDatum, { onDelete: "CASCADE" })
  waiver_data?: WaiverDatum[];

  @HasMany(() => Result, { onDelete: "CASCADE" })
  results?: Result[];

  @HasOne(() => Finding, { onDelete: "CASCADE" })
  finding?: Finding;

  @BelongsToMany(
    () => Profile,
    () => EvaluationProfile
  )
  profiles?: Profile[];

  // Our owners
  @BelongsTo(() => User)
  owning_user?: User;

  @AllowNull(true)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  owning_user_id!: number | null;

  @BelongsTo(() => Usergroup)
  owning_usergroup?: Usergroup;

  @AllowNull(true)
  @ForeignKey(() => Usergroup)
  @Column(DataType.INTEGER)
  owning_usergroup_id!: number | null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
