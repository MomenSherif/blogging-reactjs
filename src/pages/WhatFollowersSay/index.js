import React, { useEffect, useState } from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import BlogCard from '../../components/BlogCard';
import BlogPageSkeleton from '../../Skeletons/BlogPageSkeleton';
import Pagination from '@material-ui/lab/Pagination';

import { fetchFollowersBlogs } from '../../api/helper';
import useStyles from './WhatFollowersSayStyle';

const WhatFollowersSay = () => {
  const [state, setState] = useState({ blogs: [], pages: 1 });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchFollowersBlogs({ page }).then(({ blogs, pages }) => {
      setState({ blogs, pages });
      setIsLoading(false);
    });
  }, [page]);

  const { blogs, pages } = state;
  const blogList = blogs.map((blog) => <BlogCard key={blog._id} {...blog} />);

  const classes = useStyles();
  return (
    <Container maxWidth='md' className={classes.container}>
      {isLoading ? (
        <BlogPageSkeleton />
      ) : blogs.length === 0 ? (
        <Typography variant='h2' align='center'>
          No Blogs Found!
          <span role='img' aria-label='meh'>
            🙄
          </span>
        </Typography>
      ) : (
        blogList
      )}

      {pages > 1 && (
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

export default WhatFollowersSay;
