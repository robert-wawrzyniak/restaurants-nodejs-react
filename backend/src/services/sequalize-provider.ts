import { Sequelize } from "sequelize";

const sequelizeInstance = new Sequelize(
  "postgres://postgres:password@localhost:5432/restaurants"
);

export default sequelizeInstance;
