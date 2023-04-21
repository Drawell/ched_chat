import axios from 'axios'

export async function reqLogin(login: string, password: string) {
  try {
    const response = await axios.post('/api/login', { email: login, password })
    if (response.status === 200) {
      return response.data
    } else {
      return null
    }
  } catch {
    return null
  }
}
