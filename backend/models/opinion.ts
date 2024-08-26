import { DataTypes, Model } from "sequelize";
import sequelizeInstance from "../src/services/sequalize-provider";
import Restaurant from "./restaurant";
import User from "./user";

interface OpinionAttributes {
  restaurantId: number;
  userId: number;
  rating: number;
  description: string;

  updatedAt?: Date;
  createdAt?: Date;
}

class Opinion extends Model<OpinionAttributes> implements OpinionAttributes {
  public restaurantId!: number;
  public userId!: number;
  public rating!: number;
  public description!: string;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Opinion.init(
  {
    restaurantId: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: false,
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Opinion",
  }
);

Restaurant.hasMany(Opinion, {
  foreignKey: "restaurantId",
});
User.hasMany(Opinion, {
  foreignKey: "userId",
});

export default Opinion;
