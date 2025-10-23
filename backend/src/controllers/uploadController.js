const admin = require('firebase-admin')

module.exports = async function uploadController(req,res){
  // expects { cid, fileNameEncrypted, size }
  const { cid, fileNameEncrypted, size } = req.body
  if(!cid) return res.status(400).json({ error: 'cid required' })
  try{
    const doc = {
      ownerUid: req.user.uid,
      cid,
      fileNameEncrypted: fileNameEncrypted || null,
      size: size || 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }
    const ref = await admin.firestore().collection('documents').add(doc)
    await req.log('upload', { docId: ref.id, cid })
    res.json({ id: ref.id })
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'server_error' })
  }
}

module.exports.delete = async function(req,res){
  const id = req.params.id
  try{
    const ref = admin.firestore().collection('documents').doc(id)
    const doc = await ref.get()
    if(!doc.exists) return res.status(404).json({ error: 'not_found' })
    if(doc.data().ownerUid !== req.user.uid) return res.status(403).json({ error: 'forbidden' })
    await ref.delete()
    await req.log('delete', { docId: id })
    res.json({ ok:true })
  }catch(e){
    console.error(e)
    res.status(500).json({ error:'server_error' })
  }
}
