import {
  BelongsToMany,
  HasMany,
  Column,
  CreatedAt,
  Model,
  Scopes,
  Table,
  UpdatedAt,
  AllowNull,
  DataType
} from "sequelize-typescript";
import { EvaluationProfile } from "./EvaluationProfile";
import { Evaluation } from "./Evaluation";
import { Input } from "./Input";
import { Group } from "./Group";
import { Depend } from "./Depend";
import { Support } from "./Support";
import { Control } from "./Control";
import { DependantParent } from "./DependantParent";

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
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  title!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  maintainer!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  copyright!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  copyright_email!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  license!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  summary!: string | null;

  //@Column
  //description?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  version!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  status!: string | null;

  @AllowNull(false)
  @Column(DataType.STRING)
  sha256!: string;

  @HasMany(() => Input, { onDelete: "CASCADE" })
  inputs?: Input[];

  @HasMany(() => Group, { onDelete: "CASCADE" })
  groups?: Group[];

  @HasMany(() => Depend, { onDelete: "CASCADE" })
  depends?: Depend[];

  @HasMany(() => Support, { onDelete: "CASCADE" })
  supports?: Support[];

  @HasMany(() => Control, { onDelete: "CASCADE" })
  controls?: Control[];

  @BelongsToMany(
    () => Evaluation,
    () => EvaluationProfile
  )
  evaluations?: Evaluation[];

  @BelongsToMany(
    () => Profile,
    () => DependantParent,
    "dependant_id",
    "parent_id"
  )
  parents?: Profile[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
