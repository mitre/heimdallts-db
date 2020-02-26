import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  AllowNull
} from "sequelize-typescript";

export interface TagContent {
  name: string;
  value: Required<unknown>;
}

@Table({
  tableName: "tags"
})
export class Tag extends Model<Tag> {
  @AllowNull(false)
  @Column
  tagger_id!: number;

  @AllowNull(false)
  @Column
  tagger_type!: string;

  /** Note:
   * Will always be a JSON of format TagContent
   */
  @AllowNull(false)
  @Column(DataType.JSONB)
  content!: TagContent;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
