import { time } from "console";

function dateNow(): string {
  let ts = Date.now();

  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hour = date_ob.getHours();
  let minute = date_ob.getMinutes();
  let second = date_ob.getSeconds();

  // prints date & time in YYYY-MM-DD format
  return `${date}-${month}-${year} ${hour}:${minute}:${second}`;
}

function Info(msg: string) {
  console.log(`[INFO]\t\t[${dateNow()}]\t${msg}`);
}
function Warning(msg: string) {
  console.log(`[WARNING]\t[${dateNow()}]\t${msg}`);
}
function Error(msg: string) {
  console.log(`[ERROR]\t\t[${dateNow()}]\t${msg}`);
}
function Log(msg: string) {
  console.log(`[LOG]\t\t[${dateNow()}]\t${msg}`);
}
function Success(msg: string) {
  console.log(`[SUCCESS]\t[${dateNow()}]\t${msg}`);
}
function Critical(msg: string) {
  console.log(`[CRITICAL]\t[${dateNow()}]\t${msg}`);
}

export { Info, Warning, Error, Log, Critical, Success, dateNow };
