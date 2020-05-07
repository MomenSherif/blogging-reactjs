import axios from '../../api/axios';
import catchErrors from '../../api/catchErrors';
import { BACKEND_BASE_URL } from '../../config';

const setBlogs = ({ pages, blogs }) => ({
  type: 'SET_BLOGS',
  pages,
  blogs,
});

const fetchBlogs = ({ page = 1, pageSize = 7 } = {}) => {
  return catchErrors(async (dispatch) => {
    const { blogs, pages } = await axios.get(
      `${BACKEND_BASE_URL}/blogs?page=${page}&pagesize=${pageSize}`
    );
    dispatch(setBlogs({ blogs, pages }));
  });
};

const fetchFollowersBlogs = ({ page = 1, pageSize = 7 } = {}) => {
  return catchErrors(async (dispatch) => {
    const { blogs, pages } = await axios.get(
      `${BACKEND_BASE_URL}/users/followed/blogs?page=${page}&pagesize=${pageSize}`
    );
    dispatch(setBlogs({ blogs, pages }));
  });
};

const fetchUserBlogs = ({ slug = '', page = 1, pageSize = 7 } = {}) => {
  return catchErrors(async (dispatch) => {
    const { blogs, pages } = await axios.get(
      `${BACKEND_BASE_URL}/users/${slug}/blogs?page=${page}&pagesize=${pageSize}`
    );
    dispatch(setBlogs({ blogs, pages }));
  });
};

const addBlog = ({ title = '', body = '', photo, tags = [] } = {}) => {
  return catchErrors(async (dispatch) => {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('body', body);
    fd.append('tags', JSON.stringify(tags));
    fd.append('photo', photo);

    const {
      blog: { slug },
      message,
    } = await axios.post(`${BACKEND_BASE_URL}/blogs`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return slug;
  });
};

export { fetchBlogs, fetchFollowersBlogs, fetchUserBlogs, addBlog };
