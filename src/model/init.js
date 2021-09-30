function initModel() {
  let fs = require("fs");

  // Check apakah ada atau tidak file db.json
  if (!fs.existsSync("public/db.json")) {
    fs.writeFileSync("public/db.json", '{"data":[]}', function (err) {
      throw err;
    });
    console.log("Creating db.json on public folders");
  }

  if (!fs.existsSync("public/relation.json")) {
    fs.writeFileSync("public/relation.json", '{"data":[]}', function (err) {
      throw err;
    });
    console.log("Creating relation.json on public folders");
  }

  console.log("success");
}

module.exports = { initModel };
