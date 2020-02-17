import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType
} from "sequelize-typescript";

export interface TagContent {
  name: string;
  value: Required<unknown>;
}

@Table({
  tableName: "tags"
})
export class Tag extends Model<Tag> {
  @Column
  tagger_id!: number;

  @Column
  tagger_type!: string;

  @Column(DataType.JSONB)
  content!: TagContent;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
