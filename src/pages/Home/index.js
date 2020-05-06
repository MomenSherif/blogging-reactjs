import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import BlogCard from '../../components/BlogCard';
import BlogPageSkeleton from '../../Skeletons/BlogPageSkeleton';
import Pagination from '@material-ui/lab/Pagination';

import useStyles from './HomeStyle';

import { fetchBlogs } from '../../redux/actions/blogs';

const Home = ({ pages, blogs, onFetchBlogs }) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      await onFetchBlogs(page);
      setIsLoading(false);
    })();
  }, [page]);

  const blogList = blogs.map((blog) => <BlogCard key={blog._id} {...blog} />);
  const classes = useStyles();
  return (
    <Container maxWidth='md' className={classes.container}>
      {isLoading && blogs.length !== 0 ? <BlogPageSkeleton /> : blogList}
      {pages > 1 && (
        <Pagination
          count={pages}
          page={page}
          color='primary'
          onChange={handlePageChange}
          className={classes.pagination}
        />
      )}
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
