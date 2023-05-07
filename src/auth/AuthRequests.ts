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

export async function reqRegister(
  name: string,
  email: string,
  password: string,
  secondPassword: string
) {
  try {
    const response = await axios.post('/api/register', {
      name,
      email,
      password,
      second_password: secondPassword,
    })
    if (response.status === 200) {
      return response.data
    } else {
      return null
    }
  } catch {
    return null
  }
}

export async function reqGetCurChed() {
  try {
    const response = await axios.get('/api/get_cur_ched')
    if (response.status === 200) {
      return response.data
    } else {
      return null
    }
  } catch {
    return null
  }
}
