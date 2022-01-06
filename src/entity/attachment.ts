import { DataTypes } from "sequelize";
import { db } from "../db/db";

const Attachment = db.define("Attachment", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  dir: {
    type: DataTypes.TEXT,
  },
});

export { Attachment };
