const commandFunction = {
  ingat: require("./command/ingat").ingat,
  prefix: require("./command/prefix").prefix,
  help: require("./command/help").help,
};
const commandList = Object.keys(commandFunction);

function controllers(msg) {
  const prefix = process.env.PREFIX;
  if (msg.content.slice(0, prefix.length) != prefix ||
      msg.author.bot ) {
    return;
  }

  //Menghilangkan prefix
  msg.content = msg.content.slice(
    process.env.PREFIX.length,
    msg.content.length
  );

  let split_content = msg.content.split(" ");
  const command = split_content[0];
  // removing command
  split_content.shift();
  msg.content = split_content.join(" ");

  if (commandList.includes(command)) {
    try {
      commandFunction[command](msg);
    } catch (e) {
      msg.reply(`internal server error with error : ${e}`);
    }
  }
}

module.exports = { controllers };
