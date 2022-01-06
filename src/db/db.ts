import { Database, sqlite3 } from "sqlite3";
import { open } from "sqlite";

const sqlite3 = require('sqlite3').verbose();

const db:Database = new sqlite3.Database("data.db")

export { db }