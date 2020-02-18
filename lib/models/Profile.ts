import {
  BelongsToMany,
  HasMany,
  Column,
  CreatedAt,
  Model,
  Scopes,
  Table,
  UpdatedAt
} from "sequelize-typescript";
import { EvaluationProfile } from "./EvaluationProfile";
import { Evaluation } from "./Evaluation";
import { Input } from "./Input";
import { Group } from "./Group";
import { Depend } from "./Depend";
import { Support } from "./Support";
import { Control } from "./Control";

@Scopes(() => ({
  evaluations: { include: [Evaluation] },
  controls: { include: [Control] },
  meta: {
    include: [Group, Depend, Support]
  }
}))
@Table({
  tableName: "profiles"
})
export class Profile extends Model<Profile> {
  @Column
  name!: string;

  @Column
  title?: string;

  @Column
  maintainer?: string;

  @Column
  copyright?: string;

  @Column
  copyright_email?: string;

  @Column
  license?: string;

  @Column
  summary?: string;

  @Column
  description?: string;

  @Column
  version?: string;

  @Column
  status?: string;

  @Column
  sha256!: string;

  @HasMany(() => Input, "profile_id")
  inputs?: Input[];

  @HasMany(() => Group, { foreignKey: "profile_id", onDelete: "CASCADE" })
  groups?: Group[];

  @HasMany(() => Depend, "profile_id")
  depends?: Depend[];

  @HasMany(() => Support, "profile_id")
  supports?: Support[];

  @HasMany(() => Control, "profile_id")
  controls?: Control[];

  @BelongsToMany(
    () => Evaluation,
    () => EvaluationProfile
  )
  evaluations?: Evaluation[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
