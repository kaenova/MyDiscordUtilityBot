function ingat(msg) {
  let attechementID = null;
  let savedMessage = null;

  if (msg.content.trim() !== "") {
    savedMessage = msg.content;
  }

  // Handling attechement
  let attachments = msg.attachments;

  attachments.each((attachments) => {
    let attachmentsName = attachments.name;
    // Buat nama file
    let fs = require("fs");
    let fetch = require("node-fetch");
    async function download() {
      let response = await fetch(attachments.url).catch((e) => {
        throw e;
      });
      let buffer = await response.buffer();
      fs.writeFile(`public/attechements/${attachmentsName}`, buffer, () =>
        console.log(`attechement saved : ${attachmentsName}`)
      );
    }

    try {
      download();
    } catch (e) {
      throw e;
    }
    attechementID = attachmentsName;
  });

  if (attechementID == null && savedMessage == null) {
    msg.reply("Tidak ada yang diingatkan");
    return;
  }

  // Model insert data
  let data = {
    id: Date.now(),
    pesan: savedMessage,
    attechements: attechementID,
  };

  try {
    require("../../../model/insert").InsertPengingat(data);
  } catch (e) {
    throw e;
  }

  msg.reply("Pengingat tersimpan");
}

module.exports = { ingat };
