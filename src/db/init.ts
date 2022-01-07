import { db } from "./db";
import { Critical, Info, Log, Success } from "../utils/logger";
import { Attachment } from "../entity/attachment";
import { Pengingat } from "../entity/pengingat";

function InitDB() {
  Info("Testing Connection");
  try {
    db.authenticate();
    Success("DB is connected");
  } catch (err) {
    Critical("DB is fail to connect");
    throw err;
  }

  Info("Creating table");
  try {
    Attachment.sync();
    Pengingat.sync();
    Success("Table is created");
  } catch (err) {
    Critical("Failed to create table");
    throw err;
  }
}

export { InitDB };
