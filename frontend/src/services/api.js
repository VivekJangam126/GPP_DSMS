import axios from 'axios'
import { auth } from './firebase'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

async function getIdToken(){
  const user = auth.currentUser
  if(!user) return null
  return user.getIdToken()
}

export async function post(path, data){
  const token = await getIdToken()
  return axios.post(API_BASE + path, data, { headers: { Authorization: `Bearer ${token}` } })
}

export async function get(path, params){
  const token = await getIdToken()
  return axios.get(API_BASE + path, { params, headers: { Authorization: `Bearer ${token}` } })
}

export default { post, get }
