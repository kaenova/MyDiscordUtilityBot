function initScheduler(client) {
  const scheduler = require("node-schedule");
  const tz = "Asia/Jakarta";
  const testRule = new scheduler.RecurrenceRule();
  testRule.second = 1;
  testRule.tz = tz;
  const jobTestRule = scheduler.scheduleJob(testRule, () => {
    console.log("Ini dijalankan setiap detik ke satu");
    client.channels.cache
      .get(process.env.INGAT_CHANNEL)
      .send("hello world", "bruh", "anjay")
      .then(console.log("bruh"));
  });

  console.log("success");
}

module.exports = { initScheduler };
