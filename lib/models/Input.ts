import {
  BelongsTo,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  AllowNull
} from "sequelize-typescript";
import { Evaluation } from "./Evaluation";
import { Profile } from "./Profile";

@Table({
  tableName: "inputs"
})
export class Input extends Model<Input> {
  @Column
  name!: string;

  @Column(DataType.JSONB)
  options!: unknown;

  @BelongsTo(() => Profile, {
    foreignKey: {
      allowNull: false,
      name: "profile_id"
    }
  })
  profile?: Profile;

  @BelongsTo(() => Evaluation, {
    foreignKey: {
      allowNull: false,
      name: "evaluation_id"
    }
  })
  evaluation?: Evaluation;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
