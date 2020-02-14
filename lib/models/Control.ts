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
  UpdatedAt
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
  @Column
  title!: string;

  @Column
  desc!: string;

  @Column
  impact!: number;

  @Column(DataType.TEXT)
  code!: string;

  @Column
  control_id!: string;

  @HasMany(() => Tag, {
    foreignKey: "tagger_id",
    scope: { tagger_type: "Control" }
  })
  tags!: Tag[];

  @HasMany(() => Ref, "control_id")
  refs!: Ref[];

  @HasMany(() => Description, "control_id")
  descriptions!: Description[];

  @HasMany(() => WaiverDatum, "control_id")
  waiver_data!: WaiverDatum[];

  @HasMany(() => Result, "control_id")
  results!: Result[];

  @HasOne(() => SourceLocation, "control_id")
  source_location!: SourceLocation;

  @BelongsTo(() => Profile, "profile_id")
  profile?: Profile | null = null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
