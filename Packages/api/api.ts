import  axios  from 'axios';




export const api = axios.create({
  baseURL: "https://backend-lapizza-production.up.railway.app",
})
