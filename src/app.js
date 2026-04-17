/* =============================== app.js ================================ */
import express from 'express'
import cors from 'cors'
import quranRoutes from './routes/quran.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

/* =============================== Routes ================================ */
app.get('/', (req, res) => {
  res.send('server running well')
})
/* =============================== Routes ================================ */
app.get('/api', (req, res) => {
  res.send('api route hit')
})
app.use('/api/quran', quranRoutes)

export default app
