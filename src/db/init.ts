import { db } from "./db";
import { Info, Log, Success } from "../utils/logger";

async function InitDB() {
  Info("Starting Migration")
  // Create Table
  let statement = []
  statement.push("CREATE TABLE IF NOT EXISTS pesan")
  statement.push("CREATE TABLE IF NOT EXISTS file")
  for (let i = 0; i < statement.length; i++) {
    Log(`${statement[i]}`)
    db.run(statement[i], (err) => {
      Log("Behasil Eksekusi")
      if (err) throw err.message
    })
  }
  Success("Migration Complete")
}

export { InitDB }