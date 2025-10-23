const authFirebase = require('../src/middlewares/authFirebase')
const admin = require('firebase-admin')

jest.mock('firebase-admin')

describe('authFirebase middleware', ()=>{
  it('returns 401 when no token', async ()=>{
    const req = { headers: {} }
    const res = { status: jest.fn(()=>res), json: jest.fn() }
    const next = jest.fn()
    await authFirebase(req,res,next)
    expect(res.status).toHaveBeenCalledWith(401)
  })
})
