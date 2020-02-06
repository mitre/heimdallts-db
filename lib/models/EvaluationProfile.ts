import { Model, Column, Table, ForeignKey } from "sequelize-typescript";
import { Evaluation } from "./Evaluation";
import { Profile } from "./Profile";

@Table({
  timestamps: false,
  tableName: "evaluations_profiles"
})
export class EvaluationProfile extends Model<EvaluationProfile> {
  @ForeignKey(() => Evaluation)
  @Column
  evaluationId!: number;

  @ForeignKey(() => Profile)
  @Column
  profileId!: number;
}
