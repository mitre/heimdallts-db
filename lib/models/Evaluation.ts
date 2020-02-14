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
  AllowNull
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

@Scopes(() => ({
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

  @HasOne(() => Statistic, {
    foreignKey: {
      name: "evaluation_id",
      allowNull: false
    }
  })
  statistic?: Statistic;

  @HasOne(() => Platform, {
    foreignKey: {
      name: "evaluation_id",
      allowNull: false
    }
  })
  platform?: Platform;

  @HasMany(() => Input, "evaluation_id")
  inputs?: Input[];

  @HasMany(() => Tag, {
    foreignKey: "tagger_id",
    scope: { tagger_type: "Evaluation" }
  })
  tags!: Tag[];

  @HasMany(() => WaiverDatum, "evaluation_id")
  waiver_data!: WaiverDatum[];

  @HasMany(() => Result, "evaluation_id")
  results!: Result[];

  @HasOne(() => Finding, {
    foreignKey: {
      name: "evaluation_id",
      allowNull: false
    }
  })
  finding?: Finding;

  @BelongsToMany(
    () => Profile,
    () => EvaluationProfile
  )
  profiles?: Profile[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
