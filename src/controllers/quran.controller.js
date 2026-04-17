/* =============================== quran.controller.js ================================ */
import { getAllSurahs, getSurahAyahs } from '../services/quran.service.js'

export const fetchSurahs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query

    const surahs = await getAllSurahs()

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const paginatedData = surahs.slice(startIndex, endIndex)

    res.json({
      total: surahs.length,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(surahs.length / limit),
      data: paginatedData,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch surahs' })
  }
}
/* =============================== Ayahs ================================ */
export const fetchSurahAyahs = async (req, res) => {
  try {
    const { id } = req.params
    const ayahs = await getSurahAyahs(id)
    res.json(ayahs)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ayahs' })
  }
}
