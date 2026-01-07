import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// This automatically adds the security token to every request if the user is logged in
API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
  }
  return req;
});

export default API;