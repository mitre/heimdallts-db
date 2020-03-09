import {
  Model,
  Column,
  Table,
  ForeignKey,
  AllowNull
} from "sequelize-typescript";
import { Evaluation } from "./Evaluation";
import { Usergroup } from "./Usergroup";

@Table({
  timestamps: false,
  tableName: "usergroups_evaluations"
})
export class EvaluationUsergroup extends Model<EvaluationUsergroup> {
  @AllowNull(false)
  @ForeignKey(() => Evaluation)
  @Column
  evaluation_id!: number;

  @AllowNull(false)
  @ForeignKey(() => Usergroup)
  @Column
  usergroup_id!: number;
}
