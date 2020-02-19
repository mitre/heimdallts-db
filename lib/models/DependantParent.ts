import { Model, Column, Table, ForeignKey } from "sequelize-typescript";
import { Profile } from "./Profile";

@Table({
  timestamps: false,
  tableName: "dependants_parents"
})
export class DependantParent extends Model<DependantParent> {
  @ForeignKey(() => Profile)
  @Column
  parentId!: number;

  @ForeignKey(() => Profile)
  @Column
  dependantId!: number;
}
