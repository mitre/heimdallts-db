import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DataType
} from "sequelize-typescript";

@Table({
  tableName: "tags"
})
export class Tag extends Model<Tag> {
  @Column
  tagger_id!: number;

  @Column
  tagger_type!: string;

  @Column(DataType.JSONB)
  content: unknown;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
