import { Web3Storage } from 'web3.storage'

const token = import.meta.env.VITE_WEB3STORAGE_TOKEN
const client = new Web3Storage({ token })

export async function uploadBytes(bytes, onProgress){
  const file = new File([bytes], 'upload.bin')
  const cid = await client.put([file], { maxRetries: 3, onStoredChunk: (size) => onProgress && onProgress(size) })
  return cid
}

export default client
