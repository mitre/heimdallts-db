import {Model, Column, Table, HasOne, BelongsToMany, DefaultScope, Scopes, CreatedAt, UpdatedAt} from "sequelize-typescript";
import {Profile} from "./Profile";
import {EvaluationProfile} from "./EvaluationProfile";
import {Statistic} from "./Statistic";
import {Platform} from "./Platform";

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

  @BelongsToMany(() => Profile, () => EvaluationProfile)
  profiles?: Profile[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
