import { DataTypes, Model } from "sequelize";
import sequelizeInstance from "../services/sequalize-provider";

export const userRoles = ["Admin", "User", "RestaurantOwner"];

export type Role = "Admin" | "User" | "RestaurantOwner";

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  role: Role;

  updatedAt?: Date;
  createdAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public role!: Role;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  },
  {
    sequelize: sequelizeInstance,
    modelName: "User",
  }
);

export default User;
