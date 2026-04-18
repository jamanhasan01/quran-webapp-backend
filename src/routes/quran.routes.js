/* =============================== quran.routes.js ================================ */
import express from 'express'
import { fetchSurahs, fetchSurahAyahs } from '../controllers/quran.controller.js'

const router = express.Router()

/* =============================== Routes ================================ */
router.get('/surahs', fetchSurahs)
router.get('/surah/:id', fetchSurahAyahs)


export default router
