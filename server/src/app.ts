import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'

const app = express()

app.use(cors({ origin: true }))
app.use(express.json())

app.use('/', routes)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

export default app
