const { channel } = require("diagnostics_channel");
const { InsertRelation } = require("../../model/insert");

function sendPengingat(client) {
  let fs = require("fs");

  // Deleting all messages
  async function deleteMessage() {
    let fetched;
    fetched = await client.channels.cache
      .get(process.env.INGAT_CHANNEL)
      .fetch();
    let cached_message = await fetched.messages.cache;
    cached_message.each((msg) => {
      msg.delete();
    });
  }
  deleteMessage();

  fs.writeFileSync("public/relation.json", '{"data":[]}', function (err) {
    throw err;
  });

  // Ambil Data
  let rawData = fs.readFileSync("public/db.json");
  let dataUtama = JSON.parse(rawData);
  let ingat = dataUtama["data"];

  let finalMessage;
  if (ingat.length == 0) {
    finalMessage = "<@" + process.env.USER_ID + "> tidak ada pengingat ^^";
    client.channels.cache
      .get(process.env.INGAT_CHANNEL)
      .send(finalMessage)
      .catch((e) => {
        throw e;
      });
    return;
  } else {
    finalMessage = "<@" + process.env.USER_ID + ">";
  }

  for (let i = 0; i < ingat.length; i++) {
    if (ingat[i].attechements != null) {
      client.channels.cache
        .get(process.env.INGAT_CHANNEL)
        .send({
          content: ingat[i].pesan,
          files: [`public/attechements/${ingat[i].attechements}`],
        })
        .then((message) => {
          // Do message relation with db
          message.react("✅");
          let dataSimpan = {
            message_id: message.id,
            ingat_id: ingat[i].id,
          };
          InsertRelation(dataSimpan);
        })
        .catch((e) => {
          throw e;
        });
    } else {
      client.channels.cache
        .get(process.env.INGAT_CHANNEL)
        .send({
          content: ingat[i].pesan,
        })
        .then((message) => {
          // Do message relation with db
          message.react("✅");
          let dataSimpan = {
            message_id: message.id,
            ingat_id: ingat[i].id,
          };
          InsertRelation(dataSimpan);
        })
        .catch((e) => {
          throw e;
        });
    }
  }

  client.channels.cache
    .get(process.env.INGAT_CHANNEL)
    .send(finalMessage)
    .catch((e) => {
      throw e;
    });
}

module.exports = { sendPengingat };
