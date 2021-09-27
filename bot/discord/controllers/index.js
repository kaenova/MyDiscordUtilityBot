const commandFunction = {
  ingat: require("./command/ingat").ingat,
  prefix: require("./command/prefix").prefix,
  help: require("./command/help").help,
};

function controllers(msg) {
  const prefix = process.env.PREFIX;
  if (msg.content.slice(0, prefix.length) != prefix) {
    return;
  }

  //
  msg.content = msg.content.slice(
    process.env.PREFIX.length,
    msg.content.length
  );
  let split_content = msg.content.split(" ");
  const command = split_content[0];
  // removing command
  split_content.shift();
  msg.content = split_content.join(" ");

  commandFunction[command](msg);
}

module.exports = { controllers };
