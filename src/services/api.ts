import axios from 'axios';

const base_url = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: base_url,
});

if (api.defaults.headers) {
  api.defaults.headers.get.Accepts = 'application/json';
  api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
}
