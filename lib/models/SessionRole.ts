import {Model, Column, Table, ForeignKey} from 'sequelize-typescript';
import {Role} from './Role';
import { Session } from './Session';

@Table({
  timestamps: false,
  tableName: 'usergroups_roles',
})
export class SessionRole extends Model<SessionRole> {
  @ForeignKey(() => Session)
  @Column
  sessionId!: number;

  @ForeignKey(() => Role)
  @Column
  roleId!: number;
}
