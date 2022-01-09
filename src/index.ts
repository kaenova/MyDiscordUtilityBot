import { Log, Warning, Error, Info, Critical, Success } from "./utils/logger";
import { InitDB } from "./db/init";
import { InitDiscord } from "./discord/init";
import dotenv from "dotenv";
// @ts-ignore
import { InitFrontend } from "./frontend/init";
import { PostSetupDiscord } from "./discord/post";

dotenv.config();

if (process.env.PREFIX == undefined) process.env.PREFIX = "!"

Info("Initializing Database");
InitDB();

Info("Initializing Discord BOT");
var client = InitDiscord();

if (process.env.WEB !== 'false'){
  Info("Initializing Frontend");
  InitFrontend();
}

// Run any async modules
(
  async function () {
    client.login(process.env.TOKEN).then(() => {
      PostSetupDiscord()
    });
  }()
)