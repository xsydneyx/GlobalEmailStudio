import { describe, it } from 'node:test'
import assert from 'node:assert'
import request from 'supertest'
import app from '../src/app.js'

describe('API routes', () => {
  it('GET /health returns 200 and { status: "ok" }', async () => {
    const res = await request(app).get('/health')
    assert.strictEqual(res.status, 200)
    assert.deepStrictEqual(res.body, { status: 'ok' })
  })

  it('GET /session returns 200 and payload with templates and locations arrays', async () => {
    const res = await request(app).get('/session')
    assert.strictEqual(res.status, 200)
    assert.ok(Array.isArray(res.body.templates))
    assert.ok(Array.isArray(res.body.locations))
    assert.ok(res.body.templates.length >= 1)
    assert.ok(res.body.locations.length >= 1)
  })

  it('GET /templates returns 200 and array of templates', async () => {
    const res = await request(app).get('/templates')
    assert.strictEqual(res.status, 200)
    assert.ok(Array.isArray(res.body))
    if (res.body.length > 0) {
      assert.ok('id' in res.body[0] && 'name' in res.body[0] && 'subject' in res.body[0] && 'body' in res.body[0])
    }
  })

  it('GET /locations returns 200 and array of locations', async () => {
    const res = await request(app).get('/locations')
    assert.strictEqual(res.status, 200)
    assert.ok(Array.isArray(res.body))
    if (res.body.length > 0) {
      const loc = res.body[0]
      assert.ok('id' in loc && 'city' in loc && 'storeName' in loc && 'country' in loc && 'language' in loc && 'timezone' in loc)
    }
  })
})
