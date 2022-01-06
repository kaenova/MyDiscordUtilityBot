import { Log, Warning, Error, Info, Critical, Success } from "./utils/logger";
import { InitDB } from "./db/init";
import { InitDiscord } from "./discord/init";
import { InitScheduler } from "./discord/scheduler";
import dotenv from 'dotenv'

dotenv.config()

Info("Initializing Database");
InitDB()

Info("Initializing Discord BOT");
var client = InitDiscord()

Info("Initializing Discord Scheduler");
client = InitScheduler(client)

client.login(process.env.TOKEN)

