Ini hanyalah BOT Pengingat Setiap Hari  
BOT ini di hardcode untuk mengingatkan setiap jam 8 Pagi, 12 Siang, dan 7 Malam.

**Perintah**

- `help`  
   Menampilkan bacaan ini.
- `prefix` `[prefix baru]`  
   Merubah prefix lama menjadi `[prefix baru]`.

**WHAT I HOPE**  
Suatu BOT yang akan mengingatkan pesan yang pernah diminta untuk menyimpan pesan dengan prefix tertentu pada channel text tertentu. Lalu pada setiap waktu tertentu bot tersebut akan mengirim kembali pesan-pesan tersebut.  
Pada setiap pesan tersebut tersedia emoticon ✅ yang ketika dipencet maka akan menghapus pesan tersebut, dan tidak akan mengingatkan kembali.  
Setiap BOT ini akan mengingatkan, BOT akan menghapus pesan-pesan yang pernah dikirim oleh BOT ini, dan baru akan mengirimkan pengingat yang baru.

**TO DO**

1. Membuat koneksi dengan database.
2. Mengambil dan menyimpan gambar ketika ada pesan yang memiliki attachment.
3. Membuat scheduler
4. Setiap hari nge cek ke validan image id yang tersimpan di database dengan yang ada di system file, salah satu id tidak ada di database maka akan dihapus.
