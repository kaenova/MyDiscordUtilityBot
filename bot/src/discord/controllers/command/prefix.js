function prefix(msg) {
  console.log(msg.content.split(" ")[0]);
  let newPrefix = msg.content.split(" ")[0];
  process.env.PREFIX = newPrefix;
  msg.reply("Prefix berhasil terubah menjadi `" + process.env.PREFIX + "`");
}

module.exports = { prefix };
