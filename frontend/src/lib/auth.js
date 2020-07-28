function setToken(token) {
  localStorage.setItem('token', token)
}
export function login(token) {
  localStorage.setItem('token', token)
}

export function logout() {
  localStorage.removeItem('token')
}

export function isLoggedIn() {
  const token = localStorage.getItem('token')
  return !!token
}

function getToken() {
  return localStorage.getItem('token')
}


function getUserId() {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  return JSON.parse(atob(parts[1])).sub
}


export default {
  setToken,
  getToken,
  isLoggedIn,
  getUserId,
  logout
}