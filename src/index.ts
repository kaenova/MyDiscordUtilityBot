import { Log, Warning, Error, Info, Critical, Success } from "./utils/logger";
import { InitDB } from "./db/init";
import { InitDiscord } from "./discord/init";
import dotenv from "dotenv";
// @ts-ignore
import {InitFrontend} from "./frontend/init";

dotenv.config();

Info("Initializing Database");
InitDB();

Info("Initializing Discord BOT");
var client = InitDiscord();

Info("Initializing Frontend");
InitFrontend();

// Run any async modules
(
  async function () {
    client.login(process.env.TOKEN);
  }()
)