import { DataTypes } from "sequelize";
import { db } from "../db/db";
import { Attachment } from "./attachment";

const Pengingat = db.define("Pengingat", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
  },
});

Pengingat.hasMany(Attachment)

export { Pengingat };
