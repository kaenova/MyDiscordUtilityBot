import { Log, Warning, Error, Info, Critical, Success } from "./utils/logger";
import { InitDB } from "./db/init";
import { InitDiscord } from "./discord/init";
import dotenv from "dotenv";
import { InitExpress } from "./express/Init";

dotenv.config();

Info("Initializing Database");
InitDB();

Info("Initializing Discord BOT");
var client = InitDiscord();

Info("Initializing Express");
var server = InitExpress();

(
  async function () {
    client.login(process.env.TOKEN);
    let port = 8000 || process.env.PORT
    server.listen(port, () => {
      Info(`Express is running at https://localhost:${port}`);
    });
  }()
)