import axios from 'axios';

const API = axios.create({ baseURL: 'https://backend-exargen.onrender.com/api/timers' });

export const startTimer = () => API.post('/start');
export const completeTimer = (id) => API.put(`/complete/${id}`);
export const fetchTimer = (id) => API.get(`/${id}`);
