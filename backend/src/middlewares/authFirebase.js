const admin = require('firebase-admin')

module.exports = async function authFirebase(req,res,next){
  const authHeader = req.headers.authorization || ''
  const match = authHeader.match(/Bearer (.+)/)
  if(!match) return res.status(401).json({ error: 'No token provided' })
  const token = match[1]
  try{
    const decoded = await admin.auth().verifyIdToken(token)
    req.user = decoded
    next()
  }catch(err){
    console.error('Token verify error', err)
    res.status(401).json({ error: 'Invalid token' })
  }
}
