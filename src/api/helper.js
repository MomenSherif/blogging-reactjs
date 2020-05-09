import axios from './axios';
import { BACKEND_BASE_URL } from '../config';

const fetchUser = (slug = '') => axios.get(`${BACKEND_BASE_URL}/users/${slug}`);

const fetchBlog = (slug = '') => axios.get(`${BACKEND_BASE_URL}/blogs/${slug}`);

const fetchBlogs = ({ page = 1, pageSize = 7 } = {}) =>
  axios.get(`${BACKEND_BASE_URL}/blogs?page=${page}&pagesize=${pageSize}`);

const fetchSearchedBlogs = ({ author, title, tag }) =>
  axios.get(`${BACKEND_BASE_URL}/blogs/search`, {
    params: {
      author,
      title,
      tag,
    },
  });

const fetchFollowersBlogs = ({ page = 1, pageSize = 7 } = {}) =>
  axios.get(
    `${BACKEND_BASE_URL}/users/followed/blogs?page=${page}&pagesize=${pageSize}`
  );

const fetchUserBlogs = ({ slug = '', page = 1, pageSize = 7 } = {}) =>
  axios.get(
    `${BACKEND_BASE_URL}/users/${slug}/blogs?page=${page}&pagesize=${pageSize}`
  );

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

export {
  fetchUser,
  fetchBlog,
  fetchBlogs,
  fetchUserBlogs,
  fetchFollowersBlogs,
  fetchSearchedBlogs,
  debounce,
};
