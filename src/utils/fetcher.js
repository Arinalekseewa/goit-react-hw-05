import axios from 'axios';

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzc0ZDlhY2NiYzNjNTk5YWJkNGRhODQ3ZDVlZDI1NyIsIm5iZiI6MTc0OTAyOTk5OS4zMzksInN1YiI6IjY4NDAxNDZmZDc2NDA2M2Y1MmFkOGE5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7JCxN7Du0QQFCsUknFB0MAfCRkizbanpuIrLtYpX6Bc';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetcher = endpoint =>
  axios
    .get(`${BASE_URL}${endpoint}`, { headers: { Authorization: TOKEN } })
    .then(res => res.data);
