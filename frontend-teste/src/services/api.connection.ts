import axios from 'axios';

const apiConnection = axios.create({
  baseURL: 'http://localhost:8000',
});

export default apiConnection
