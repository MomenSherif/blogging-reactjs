import axios from './axios';
import { BACKEND_BASE_URL } from '../config';

const fetchUser = (slug = '') => axios.get(`${BACKEND_BASE_URL}/users/${slug}`);

export { fetchUser };
