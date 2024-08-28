import { DataTypes, Model } from "sequelize";
import sequelizeInstance from "../services/sequalize-provider";

interface RestaurantAttributes {
  id?: number;
  name: string;
  description: string;

  updatedAt?: Date;
  createdAt?: Date;
}

class Restaurant
  extends Model<RestaurantAttributes>
  implements RestaurantAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Restaurant.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Restaurant",
  }
);

export default Restaurant;
