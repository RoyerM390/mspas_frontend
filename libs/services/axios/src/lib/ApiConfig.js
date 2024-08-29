import axios from 'axios';
import { url } from '@aqtiva/constants';

if (typeof window !== 'undefined') {
  // Perform localStorage action
  var token = localStorage.getItem('token');
}
const apiConfig = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + token,
  },
});
export default apiConfig;
