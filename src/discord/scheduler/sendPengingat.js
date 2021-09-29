function sendPengingat(client) {
  console.log("Ini dijalankan setiap detik ke satu");
  client.channels.cache
    .get(process.env.INGAT_CHANNEL)
    .send("hello world",)
    .then(message => {
      // Do relation with the id
      message.react("✅")
    }).catch(e => {
      throw e
    });
}

module.exports = {sendPengingat}