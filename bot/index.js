require("dotenv").config();
var Init = require("./discord/init");

console.log("========= Initializing Discord BOT =========");
const client = Init.initDiscord();
console.log("========= Discord BOT Initialized =========");
client.login(process.env.TOKEN);
