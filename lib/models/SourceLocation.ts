import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {Control} from './Control';

@DefaultScope(() => ({
  attributes: ['id', 'ref', 'line', 'createdAt', 'updatedAt']
}))
@Table
export class SourceLocation extends Model<SourceLocation> {

  @Column
  ref!: string;

  @Column
  line!: number;

  @BelongsTo(() => Control, 'control_id')
  control?: Control | null = null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
