const { InsertRelation } = require('../../model/insert');

function sendPengingat(client) {
  let fs = require('fs')

  console.log("Ini dijalankan setiap detik ke satu");

  // Ambil Data
  let rawData = fs.readFileSync('public/db.json')
  let dataUtama = JSON.parse(rawData)
  let ingat = dataUtama["data"]

  console.log(ingat)

  for (let i = 0; i < ingat.length; i++) {
    if (ingat[i].attechements != null){
      client.channels.cache
      .get(process.env.INGAT_CHANNEL)
      .send({
        content: ingat[i].pesan,
        files: [`public/attechements/${ingat[i].attechements}`]
      })
      .then(message => {
        // Do message relation with db
        message.react("✅")
        let dataSimpan = {
          message_id : message.id,
          ingat_id : ingat[i].id
        }
        InsertRelation(dataSimpan)
      }).catch(e => {
        throw e
      });
    } else {
      client.channels.cache
      .get(process.env.INGAT_CHANNEL)
      .send({
        content: ingat[i].pesan,
      })
      .then(message => {
        // Do message relation with db
        message.react("✅")
        let dataSimpan = {
          message_id : message.id,
          ingat_id : ingat[i].id
        }
        InsertRelation(dataSimpan)
      }).catch(e => {
        throw e
      });
    }
  }
}


module.exports = { sendPengingat }