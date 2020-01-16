import {BelongsToMany, HasMany, Column, CreatedAt, Model, Scopes, Table, UpdatedAt} from 'sequelize-typescript';
import {EvaluationProfile} from './EvaluationProfile';
import {Evaluation} from './Evaluation';
import {Input} from './Input';

@Scopes(() => ({
  evaluations: {
    include: [
      {
        model: Evaluation,
        through: {attributes: []},
      },
    ],
  },
  full: {
    include: [
      {
        model: Input,
        as: 'inputs',
        required: false,
      }
    ],
  }
}))
@Table
export class Profile extends Model<Profile> {

  @Column
  name!: string;

  @Column
  title!: string;

  @Column
  maintainer!: string;

  @Column
  copyright!: string;

  @Column
  copyright_email!: string;

  @Column
  license!: string;

  @Column
  summary!: string;

  @Column
  version!: string;

  @Column
  status!: string;;

  @Column
  sha256!: string;

  @HasMany(() => Input, 'profile_id')
  inputs?: Input[];

  @BelongsToMany(() => Evaluation, () => EvaluationProfile)
  evaluations?: Evaluation[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
