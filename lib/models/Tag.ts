import {Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt, DataType} from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes: ['id', 'tagger_id', 'tagger_type', 'content', 'createdAt', 'updatedAt']
}))
@Table
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
