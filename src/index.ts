import { Log, Warning, Error, Info, Critical, Success } from "./utils/logger";
import { InitDB } from "./db/init";

Info("Initializing Database");
InitDB()

Info("Initializing Discord BOT");

Info("Initializing Scheduler");
