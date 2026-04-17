import dotenv from 'dotenv'
dotenv.config()
/* =============================== quran.service.js ================================ */
import axios from 'axios'
/* =============================== BASE URL ================================ */
const BASE_URL = process.env.BASE_URL
/* =============================== Get All Surahs ================================ */
export const getAllSurahs = async () => {
  const res = await axios.get(`${BASE_URL}/surah`)
  return res.data.data
}

/* =============================== Get Surah Ayahs ================================ */
export const getSurahAyahs = async (surahId) => {
  const res = await axios.get(`${BASE_URL}/surah/${surahId}/editions/quran-uthmani,en.asad`)
  return res.data.data
}
