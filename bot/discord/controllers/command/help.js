var fs = require("fs");

const helpMessages = fs.readFileSync("public/help.txt", "utf-8").toString();

function help(msg) {
  msg.reply(
    helpMessages +
      "`" +
      process.env.PREFIX +
      "`\nPenggunaan `[Prefix][Perintah] [Argumen Perintah]`"
  );
}

module.exports = { help };
