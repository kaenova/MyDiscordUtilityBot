const str = "'default2': 0 12 * * * status: Running "

let ReNama = /\'(.*)\'/gm
let nama = ReNama.exec(str)[1]

let ReCron = /(\d+|\*) (\d+|\*) (\d+|\*) (\d+|\*) (\d+|\*)/gm
let cron = ReCron.exec(str)[0]

let ReStatus = /status: (\S+)/gm
var test = ReStatus.exec(str)[1]


console.log(nama)
console.log(cron)
console.log(test)

/*
  Lain kali API nya yang bener kek :(
  Biar gausah parsing2an :(
*/