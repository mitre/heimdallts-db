import {Model, Column, Table, HasOne, HasMany, BelongsToMany, DefaultScope, Scopes, CreatedAt, UpdatedAt} from "sequelize-typescript";
import {Profile} from "./Profile";
import {EvaluationProfile} from "./EvaluationProfile";
import {Statistic} from "./Statistic";
import {Platform} from "./Platform";
import {Input} from "./Input";
import {Tag} from "./Tag";
import {Finding} from "./Finding";
import {WaiverDatum} from './WaiverDatum';
import {Control} from "./Control";
import {Result} from "./Result";

@DefaultScope(() => ({
  attributes: ['id', 'version', 'createdAt', 'updatedAt']
}))
@Scopes(() => ({
  profiles: {
    include: [
      {
        model: Profile,
        through: {attributes: []},
      },
    ],
  },
  statistic: {
    include: [
      {
        model: Statistic,
        as: 'statistic',
        required: false,
      },
    ],
  },
  full: {
    include: [{
      model: Profile,
      through: {attributes: []},
      include: [
        {
          model: Control.scope('full'),
          as: 'controls',
          required: false,
        },
      ],
    },
    {
      model: Statistic,
      as: 'statistic',
      required: false,
    },
    {
      model: Platform,
      as: 'platform',
      required: false,
    },
    {
      model: Finding,
      as: 'finding',
      required: false,
    },
    {
      model: Tag,
      as: 'tags',
      required: false,
    }]
  }
}))
@Table
export class Evaluation extends Model<Evaluation> {

  @Column
  version!: string;

  @HasOne(() => Statistic, 'evaluation_id')
  statistic?: Statistic | null = null;

  @HasOne(() => Platform, 'evaluation_id')
  platform?: Platform | null = null;

  @HasMany(() => Input, 'evaluation_id')
  inputs?: Input[];

  @HasMany(() => Tag, {foreignKey: "tagger_id", scope: {tagger_type: "Evaluation"} })
  tags!: Tag[];

  @HasMany(() => WaiverDatum, 'evaluation_id')
  waiver_data!: WaiverDatum[];

  @HasMany(() => Result, 'evaluation_id')
  results!: Result[];

  @HasOne(() => Finding, 'evaluation_id')
  finding?: Finding | null = null;

  @BelongsToMany(() => Profile, () => EvaluationProfile)
  profiles?: Profile[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
