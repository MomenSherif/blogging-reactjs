import axios from './axios';
import { BACKEND_BASE_URL } from '../config';

const fetchUser = (slug = '') => axios.get(`${BACKEND_BASE_URL}/users/${slug}`);
const fetchBlog = (slug = '') => axios.get(`${BACKEND_BASE_URL}/blogs/${slug}`);

const fetchSearchedBlogs = ({ author, title, tag }) =>
  axios.get(`${BACKEND_BASE_URL}/blogs/search`, {
    params: {
      author,
      title,
      tag,
    },
  });

// Debounce Api callback
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};

export { fetchUser, fetchBlog, debounce, fetchSearchedBlogs };
