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
  evaluation_id!: number;

  @AllowNull(false)
  @ForeignKey(() => Profile)
  @Column
  profile_id!: number;
}
