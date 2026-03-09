import 'dotenv/config'
import app from './app.js'

const port = process.env.PORT ? Number(process.env.PORT) : 3001

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
  console.log('  GET /templates')
  console.log('  GET /locations')
  console.log('  GET /session')
  console.log('  GET /health')
})
