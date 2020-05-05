import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import BlogCard from '../../components/BlogCard';
import Pagination from '@material-ui/lab/Pagination';

import useStyles from './HomeStyle';
import { fetchBlogs } from '../../redux/actions/blogs';

const Home = ({ pages, blogs, onFetchBlogs }) => {
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  console.log(blogs);

  useEffect(() => {
    onFetchBlogs(page);
  }, [page]);

  const blogList = blogs.map((blog) => <BlogCard key={blog._id} {...blog} />);
  const classes = useStyles();
  return (
    <Container maxWidth='md' className={classes.container}>
      {blogList}
      <Pagination
        count={pages}
        page={page}
        color='primary'
        onChange={handlePageChange}
        className={classes.pagination}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  pages: state.blogs.pages,
  blogs: state.blogs.blogs,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchBlogs: (page) => dispatch(fetchBlogs({ page })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
