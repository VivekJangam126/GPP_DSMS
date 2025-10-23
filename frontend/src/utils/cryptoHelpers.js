// Simple Web Crypto helpers for AES-GCM 256

export async function generateAesKey(){
  return crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt','decrypt'])
}

export async function exportKeyRaw(key){
  return new Uint8Array(await crypto.subtle.exportKey('raw', key))
}

export async function importKeyRaw(raw){
  return crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, true, ['encrypt','decrypt'])
}

export async function encryptBytes(key, plaintextBytes){
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const cipher = await crypto.subtle.encrypt({ name:'AES-GCM', iv }, key, plaintextBytes)
  return { iv: new Uint8Array(iv), cipher: new Uint8Array(cipher) }
}

export async function decryptBytes(key, iv, cipherBytes){
  const plain = await crypto.subtle.decrypt({ name:'AES-GCM', iv }, key, cipherBytes)
  return new Uint8Array(plain)
}
