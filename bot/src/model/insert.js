/*
  Digunakan sebagai interface insert dengan db.json
  DATA:
  {
    id    : hashed String
    pesan : String
    img   : String
  }
*/

function InsertPengingat(data) {
    // Check db.json di public
      // Kalau tidak ada buat filenya
      // Kalau ada update filenya

  let fs = require('fs')

  // Check apakah ada atau tidak file db.json
  if (!fs.existsSync('public/db.json')){
    fs.writeFileSync('public/db.json', '{"data":[]}', function(err){
      throw err
    })
  }

  // Ambil data
  let rawData = fs.readFileSync('public/db.json')
  let dataUtama = JSON.parse(rawData)
  console.log(dataUtama)
  dataUtama['data'].push(data)
  rawData = JSON.stringify(dataUtama)
  fs.writeFileSync('public/db.json', rawData)
}

module.exports = {InsertPengingat}