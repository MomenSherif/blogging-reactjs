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
    } = await axios.post(`${BACKEND_BASE_URL}/blogs`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return slug;
  });
};

const editBlog = (id, updates) => {
  return catchErrors(async (dispatch) => {
    const keys = Object.keys(updates);
    const fd = new FormData();
    keys.forEach((key) => {
      if (Array.isArray(updates[key]))
        return fd.append(key, JSON.stringify(updates[key]));

      if (updates[key] !== undefined) fd.append(key, updates[key]);
    });

    const {
      blog: { slug },
    } = await axios.patch(`${BACKEND_BASE_URL}/blogs/${id}`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return slug;
  });
};

export { fetchBlogs, fetchFollowersBlogs, fetchUserBlogs, addBlog, editBlog };
