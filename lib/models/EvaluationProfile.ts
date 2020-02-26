import {
  Model,
  Column,
  Table,
  ForeignKey,
  AllowNull
} from "sequelize-typescript";
import { Evaluation } from "./Evaluation";
import { Profile } from "./Profile";

@Table({
  timestamps: false,
  tableName: "evaluations_profiles"
})
export class EvaluationProfile extends Model<EvaluationProfile> {
  @AllowNull(false)
  @ForeignKey(() => Evaluation)
  @Column
  evaluationId!: number;

  @AllowNull(false)
  @ForeignKey(() => Profile)
  @Column
  profileId!: number;
}
