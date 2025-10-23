const { Web3Storage } = require('web3.storage')

const token = process.env.WEB3STORAGE_TOKEN
const client = new Web3Storage({ token })

module.exports = client
