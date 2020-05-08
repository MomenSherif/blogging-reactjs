import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import BlogCard from '../../components/BlogCard';
import BlogPageSkeleton from '../../Skeletons/BlogPageSkeleton';
import Pagination from '@material-ui/lab/Pagination';

import UserInfoSkeleton from '../../Skeletons/UserInfoSkeleton';

import UserInfo from '../../components/UserInfo';

import { fetchUser } from '../../api/helper';
import { followUser } from '../../redux/actions/authentication';
import { fetchUserBlogs } from '../../redux/actions/blogs';

import useStyles from './UserStyle';
import { useParams } from 'react-router-dom';

const User = ({
  pages,
  blogs,
  follows,
  authId,
  onFetchBlogs,
  onFollowUser,
}) => {
  const [isBlogsLoading, setIsBlogsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [followers, setFollwers] = useState(0);
  const { slug } = useParams();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleUserFollow = async () => {
    await onFollowUser(user._id);
    const isFollowing = follows.includes(user._id);
    setFollwers((followers) => (isFollowing ? followers - 1 : followers + 1));
  };
  // Fetch User Data
  useEffect(() => {
    setIsUserLoading(true);
    fetchUser(slug).then(({ user, followers }) => {
      setUser(user);
      setFollwers(followers);
      setIsUserLoading(false);
    });
  }, [slug]);

  // Fetch BLogs
  useEffect(() => {
    (async () => {
      setIsBlogsLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      await onFetchBlogs(page);
      setIsBlogsLoading(false);
    })();
  }, [page, slug]);

  const blogList = blogs.map((blog) => (
    <BlogCard key={blog._id} {...blog} authorHidden={true} />
  ));
  const classes = useStyles();
  return (
    <Container maxWidth='md' className={classes.container}>
      <Grid container justify='center'>
        <Grid item>
          {isUserLoading ? (
            <UserInfoSkeleton />
          ) : (
            <UserInfo
              user={user}
              followers={followers}
              isFollowing={follows?.includes(user._id)}
              isFollowHidden={authId === user._id}
              handleUserFollow={handleUserFollow}
            />
          )}
        </Grid>
      </Grid>
      {isBlogsLoading ? (
        <BlogPageSkeleton />
      ) : blogs.length > 0 ? (
        blogList
      ) : (
        <Typography variant='h2' align='center'>
          No blogs!
          <span role='img' aria-label='meh'>
            🙄
          </span>
        </Typography>
      )}
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
  follows: state.auth.follows,
  authId: state.auth._id,
});

const mapDispatchToProps = (dispatch, { match }) => ({
  onFetchBlogs: (page) =>
    dispatch(fetchUserBlogs({ slug: match.params.slug, page })),
  onFollowUser: (id) => dispatch(followUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
