import { Sequelize } from "sequelize";

const db: Sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data/data.db",
  logging: false
});

export { db };
