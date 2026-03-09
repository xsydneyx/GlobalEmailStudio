import { Router } from 'express'
import { templates } from '../data/templates.js'
import { locations } from '../data/locations.js'
import type { SessionPayload } from '../types.js'

const router = Router()

/** GET /templates — list of templates (mock, single-tenant). */
router.get('/templates', (_req, res) => {
  res.json(templates)
})

/** GET /locations — list of locations (mock). */
router.get('/locations', (_req, res) => {
  res.json(locations)
})

/** GET /session — bootstrap: templates + locations in one response. */
router.get('/session', (_req, res) => {
  const payload: SessionPayload = { templates, locations }
  res.json(payload)
})

export default router
