const admin = require('firebase-admin')
const crypto = require('crypto')

function genToken(){
  return crypto.randomBytes(16).toString('hex')
}

module.exports = async function shareController(req,res){
  // create share
  const { fileId, recipientEmail, permission='view', expiry } = req.body
  if(!fileId) return res.status(400).json({ error: 'fileId required' })
  try{
    const token = genToken()
    const doc = {
      fileId,
      ownerUid: req.user.uid,
      recipientEmail: recipientEmail || null,
      permission,
      expiry: expiry ? new Date(expiry) : null,
      token,
      revoked: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }
    const ref = await admin.firestore().collection('shares').add(doc)
    await req.log('share', { shareId: ref.id, fileId })
    res.json({ shareId: ref.id, token })
  }catch(e){
    console.error(e)
    res.status(500).json({ error: 'server_error' })
  }
}

module.exports.get = async function(req,res){
  const token = req.params.token
  try{
    const q = await admin.firestore().collection('shares').where('token','==',token).limit(1).get()
    if(q.empty) return res.status(404).json({ error: 'not_found' })
    const s = q.docs[0].data()
    if(s.revoked) return res.status(403).json({ error: 'revoked' })
    if(s.expiry && s.expiry.toDate && s.expiry.toDate() < new Date()) return res.status(403).json({ error: 'expired' })
    // optionally check recipient
    await req.log('share_access', { shareId: q.docs[0].id, token })
    res.json({ fileId: s.fileId, permission: s.permission })
  }catch(e){
    console.error(e)
    res.status(500).json({ error:'server_error' })
  }
}

module.exports.revoke = async function(req,res){
  const { shareId } = req.body
  if(!shareId) return res.status(400).json({ error: 'shareId required' })
  try{
    const ref = admin.firestore().collection('shares').doc(shareId)
    const d = await ref.get()
    if(!d.exists) return res.status(404).json({ error: 'not_found' })
    if(d.data().ownerUid !== req.user.uid) return res.status(403).json({ error: 'forbidden' })
    await ref.update({ revoked: true })
    await req.log('revoke', { shareId })
    res.json({ ok:true })
  }catch(e){
    console.error(e)
    res.status(500).json({ error:'server_error' })
  }
}
