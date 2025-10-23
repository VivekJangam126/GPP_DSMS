const admin = require('firebase-admin')

module.exports = async function logger(req,res,next){
  req.log = async function(action, meta){
    try{
      const doc = {
        action,
        userUid: req.user ? req.user.uid : 'anonymous',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        meta
      }
      await admin.firestore().collection('logs').add(doc)
    }catch(e){
      console.error('Failed to write log', e)
    }
  }
  next()
}
