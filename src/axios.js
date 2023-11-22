import axios from 'axios'

const $host = axios.create({
  // baseURL: 'https://egorov-mern.onrender.com/api',
  baseURL: 'http://localhost:5000/api',
})
const $authHost = axios.create({
  // baseURL: 'https://egorov-mern.onrender.com/api',
  baseURL: 'http://localhost:5000/api',
})
const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  return config
}
$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }



