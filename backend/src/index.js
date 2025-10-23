const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const { initializeApp, applicationDefault } = require('firebase-admin/app')
const admin = require('firebase-admin')
const authFirebase = require('./middlewares/authFirebase')
const logger = require('./middlewares/logger')

require('dotenv').config()

const app = express()
app.use(helmet())
app.use(express.json({ limit: '10mb' }))
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))

initializeApp({ credential: admin.credential.applicationDefault() })

app.use(logger)

app.get('/health', (req,res)=> res.json({ok:true}))

app.use('/api', authFirebase, require('./routes'))

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log('Server listening on', port))
