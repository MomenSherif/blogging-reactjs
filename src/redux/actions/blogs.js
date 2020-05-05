import axios from '../../api/axios';
import catchErrors from '../../api/catchErrors';

const setBlogs = ({ pages, blogs }) => ({
  type: 'SET_BLOGS',
  pages,
  blogs,
});

const fetchBlogs = ({ page = 1, pageSize = 5 } = {}) => {
  return catchErrors(async (dispatch) => {
    const { blogs, pages } = await axios.get(
      `http://localhost:4000/blogs?page=${page}&pagesize=${pageSize}`
    );
    dispatch(setBlogs({ blogs, pages }));
  });
};

export { fetchBlogs };
