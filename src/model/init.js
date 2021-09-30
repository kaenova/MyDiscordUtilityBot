function initModel() {
  let fs = require("fs");

  // Check apakah ada atau tidak file db.json
  if (!fs.existsSync("public/db.json")) {
    fs.writeFileSync("public/db.json", '{"data":[]}', function (err) {
      throw err;
    });
    console.log("Creating db.json on public folders");
  }

  fs.writeFileSync("public/relation.json", '{"data":[]}', function (err) {
    throw err;
  });

  console.log("success");
}

module.exports = { initModel };
