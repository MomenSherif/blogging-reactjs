import React, { useEffect, useState } from 'react';

import Pagination from '@material-ui/lab/Pagination';
import Container from '@material-ui/core/Container';
import BlogCard from '../../components/BlogCard';

import BlogPageSkeleton from '../../Skeletons/BlogPageSkeleton';
import { fetchBlogs } from '../../api/helper';
import useStyles from './HomeStyle';

const Home = () => {
  const [state, setState] = useState({ blogs: [], pages: 1 });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchBlogs({ page }).then(({ blogs, pages }) => {
      setState({ blogs, pages });
      setIsLoading(false);
    });
  }, [page]);

  const blogList = state.blogs.map((blog) => (
    <BlogCard key={blog._id} {...blog} />
  ));

  const classes = useStyles();
  return (
    <Container maxWidth='md' className={classes.container}>
      {isLoading ? <BlogPageSkeleton /> : blogList}
      {state.pages > 1 && (
        <Pagination
          count={state.pages}
          page={page}
          color='primary'
          onChange={handlePageChange}
          className={classes.pagination}
        />
      )}
    </Container>
  );
};

export default Home;
