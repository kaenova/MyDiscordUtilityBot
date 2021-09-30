const { HapusPengingat } = require("../model/delete");

function DeletePengingat(msg, usr) {
  try {
    HapusPengingat(msg.message.id);
    msg.message.channel.send("Pengingat terhapus");
  } catch (e) {
    throw `${e}`;
  }
}

module.exports = { DeletePengingat };
