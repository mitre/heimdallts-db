import {
  BelongsTo,
  Column,
  HasMany,
  HasOne,
  Scopes,
  CreatedAt,
  Model,
  Table,
  DataType,
  UpdatedAt,
  ForeignKey,
  AllowNull,
  Min,
  Max
} from "sequelize-typescript";
import { Profile } from "./Profile";
import { Tag } from "./Tag";
import { Ref } from "./Ref";
import { Description } from "./Description";
import { SourceLocation } from "./SourceLocation";
import { WaiverDatum } from "./WaiverDatum";
import { Result } from "./Result";

@Scopes(() => ({
  meta: {
    include: [Ref, Description, SourceLocation, Result, Tag]
  }
}))
@Table({
  tableName: "controls"
})
export class Control extends Model<Control> {
  @AllowNull(true)
  @Column(DataType.TEXT)
  title!: string | null;

  @AllowNull(true)
  @Column(DataType.TEXT)
  desc!: string | null;

  @AllowNull(false)
  @Min(0.0)
  @Max(1.0)
  @Column(DataType.FLOAT)
  impact!: number;

  @AllowNull(true)
  @Column(DataType.TEXT)
  code!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  control_id!: string;

  /** The profile that contains this control */
  @BelongsTo(() => Profile)
  profile?: Profile;

  @ForeignKey(() => Profile)
  @AllowNull(false)
  @Column
  profile_id!: number;

  /** The tags associated on this control, as defined in this polymorphic table */
  @HasMany(() => Tag, {
    foreignKey: "tagger_id",
    scope: { tagger_type: "Control" }
  })
  tags?: Tag[];

  /** The controls references (e.g. nist documents, etc)  */
  @HasMany(() => Ref)
  refs?: Ref[];

  /** The describe label/value pairs */
  @HasMany(() => Description)
  descriptions?: Description[];

  /** The waiver data across all evaluations */
  @HasMany(() => WaiverDatum)
  waiver_data?: WaiverDatum[];

  /** The individual test results, across all evaluations */
  @HasMany(() => Result)
  results?: Result[];

  /** Where in the test source code this control is found */
  @HasOne(() => SourceLocation)
  source_location?: SourceLocation;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
