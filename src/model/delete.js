function HapusPengingat(id_message) {
  let fs = require("fs");
  let relation = fs.readFileSync("public/relation.json");
  let db = fs.readFileSync("public/db.json");

  let relationUtama = JSON.parse(relation);
  let dbUtama = JSON.parse(db);

  let dataRelation = relationUtama["data"];
  let dataDb = dbUtama["data"];

  // Cari id Ingat di Relation
  let searchRelaton = SearchIngatInRelation(dataRelation, id_message);
  let idIngat = searchRelaton[0];
  let indexMessage = searchRelaton[1];
  if (idIngat == -1 || indexMessage == -1) {
    throw "Ingat Relation not Found";
  }

  // Hapus id Ingat di DB
  let indexIngat = idxSearchDB(dataDb, idIngat);
  if (indexIngat == -1) {
    throw "DB Ingat ID Not Found";
  }

  // Delete Attechement and data
  if (dataDb[indexIngat].attechements != null) {
    let file = dataDb[indexIngat].attechements;
    fs.rmSync(`public/attechements/${file}`);
  }
  dataDb.splice(indexIngat, 1);

  // Hapus relation id
  dataRelation.splice(indexMessage, 1);

  relationUtama["data"] = dataRelation;
  dbUtama["data"] = dataDb;

  relation = JSON.stringify(relationUtama);
  db = JSON.stringify(dbUtama);
  fs.writeFileSync("public/relation.json", relation);
  fs.writeFileSync("public/db.json", db);
}

function SearchIngatInRelation(data, x) {
  for (let i = 0; i < data.length; i++) {
    if (x == data[i].message_id) {
      return [data[i].ingat_id, i];
    }
  }
  return -1, -1;
}

function idxSearchDB(data, x) {
  for (let i = 0; i < data.length; i++) {
    if (x == data[i].id) {
      return i;
    }
  }
  return -1;
}

module.exports = { HapusPengingat };
