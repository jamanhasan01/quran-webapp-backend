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

/* =============================== quran.controller.js ================================ */
export const fetchSurahAyahs = async (req, res) => {
  try {
    const { id } = req.params;
    // .trim() removes spaces. If result is "", it becomes falsy.
    const query = req.query.q?.trim().toLowerCase(); 

    const data = await getSurahAyahs(id);

    if (!data || !data[0] || !data[1]) {
      return res.status(404).json({ message: "Surah not found" });
    }

    /* ================= SEARCH MODE ================= */
    // Change: Check if query exists AND has length
    if (query && query.length > 0) {
      const arabic = data[0].ayahs;
      const english = data[1].ayahs;

      const results = english
        .map((ayah, i) => ({
          arabic: arabic[i]?.text,
          translation: ayah.text,
          number: ayah.numberInSurah,
        }))
        .filter((ayah) =>
          ayah.translation?.toLowerCase().includes(query)
        );

      return res.json({
        mode: "search",
        total: results.length,
        data: results,
      });
    }

    /* ================= NORMAL MODE ================= */
    // If query is empty (""), return the full surah
    return res.json({
      mode: "full",
      data: data,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch ayahs" });
  }
};
