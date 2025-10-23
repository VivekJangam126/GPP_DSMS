const admin = require('firebase-admin')

module.exports = async function logsController(req,res){
  const uid = req.query.uid || req.user.uid
  try{
    const q = await admin.firestore().collection('logs').where('userUid','==',uid).orderBy('timestamp','desc').limit(100).get()
    const items = q.docs.map(d=> ({ id: d.id, ...d.data() }))
    res.json({ items })
  }catch(e){
    console.error(e)
    res.status(500).json({ error:'server_error' })
  }
}
