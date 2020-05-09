import axios from '../../api/axios';
import catchErrors from '../../api/catchErrors';
import { BACKEND_BASE_URL } from '../../config';

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

const deleteBlog = (id) => {
  return catchErrors(async (dispatch) => {
    await axios.delete(`${BACKEND_BASE_URL}/blogs/${id}`);
  });
};
export { addBlog, editBlog, deleteBlog };
