import {BelongsTo, Column, DefaultScope, CreatedAt, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {Control} from './Control';

@DefaultScope(() => ({
  attributes: ['id', 'label', 'data', 'createdAt', 'updatedAt']
}))
@Table
export class Description extends Model<Description> {

  @Column
  label!: string;

  @Column
  data!: string;

  @BelongsTo(() => Control, 'control_id')
  control?: Control | null = null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
