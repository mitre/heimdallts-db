import {
  Model,
  Column,
  Table,
  ForeignKey,
  AllowNull
} from "sequelize-typescript";
import { Profile } from "./Profile";

@Table({
  timestamps: false,
  tableName: "dependants_parents"
})
export class DependantParent extends Model<DependantParent> {
  @ForeignKey(() => Profile)
  @AllowNull(false)
  @Column
  parentId!: number;

  @ForeignKey(() => Profile)
  @AllowNull(false)
  @Column
  dependantId!: number;
}
