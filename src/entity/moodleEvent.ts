// Will not be saved on db
interface MoodleEvent { 
  summary: string,
  description: string,
  hours: number,
  minute: number,
  day: number,
  date: number,
  month: number,
  year: number
}

const IndonesianDay: { [index: number]: string } = {
  1 : 'Senin',
  2 : 'Selasa',
  3 : 'Rabu',
  4 : 'Kamis',
  5 : 'Jumat',
  6 : 'Sabtu',
  7 : 'Minggu',
  0 : 'Minggu'
}

const IndonesianMonth: { [index: number]: string } = {
  0 : 'Januari',
  1 : 'Februari',
  2 : 'Maret',
  3 : 'April',
  4 : 'Mei',
  5 : 'Juni',
  6 : 'Juli',
  7 : 'Agustus',
  8 : 'September',
  9 : 'Oktober',
  10 : 'November',
  11 : 'Desember'
}

export { MoodleEvent, IndonesianDay, IndonesianMonth }