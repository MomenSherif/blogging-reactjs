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

export { fetchBlogs, fetchFollowersBlogs };
