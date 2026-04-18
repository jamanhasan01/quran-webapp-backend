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




/* =============================== SINGLE SURAH SEARCH ================================ */
export const searchAyahsBySurah = async (req, res) => {
  try {
    const { id } = req.params
    const query = req.query.q?.toLowerCase()

    if (!query) {
      return res.status(400).json({ message: 'Query required' })
    }

    const data = await getSurahAyahs(id)

    if (!data || !data[0] || !data[1]) {
      return res.status(404).json({ message: 'Surah not found' })
    }

    const arabic = data[0].ayahs
    const english = data[1].ayahs

    const results = english
      .map((ayah, i) => ({
        arabic: arabic[i]?.text,
        translation: ayah.text,
        number: ayah.numberInSurah,
      }))
      .filter((ayah) =>
        ayah.translation?.toLowerCase().includes(query)
      )

    res.json({
      surah: id,
      total: results.length,
      data: results,
    })
  } catch (error) {
    console.error('🔥 SEARCH ERROR:', error)
    res.status(500).json({ message: 'Search failed' })
  }
}