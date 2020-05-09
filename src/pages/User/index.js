import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import UserInfoSkeleton from '../../Skeletons/UserInfoSkeleton';
import BlogPageSkeleton from '../../Skeletons/BlogPageSkeleton';
import BlogCard from '../../components/BlogCard';
import UserInfo from '../../components/UserInfo';

import { followUser } from '../../redux/actions/authentication';
import { fetchUserBlogs, fetchUser } from '../../api/helper';
import useStyles from './UserStyle';

const User = ({ follows, authId, onFollowUser }) => {
  const [blogState, setBlogState] = useState({ blogs: [], pages: 1 });
  const [isBlogsLoading, setIsBlogsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userState, setUserState] = useState({ user: null, followers: 0 });
  const { slug } = useParams();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleUserFollow = async () => {
    await onFollowUser(userState.user._id);
    const isFollowing = follows.includes(userState.user._id);
    setUserState((prevState) => ({
      ...prevState,
      followers: isFollowing ? followers - 1 : followers + 1,
    }));
  };

  // Fetch User Data
  useEffect(() => {
    setIsUserLoading(true);
    fetchUser(slug).then(({ user, followers }) => {
      setUserState({ user, followers });
      setIsUserLoading(false);
    });
  }, [slug]);

  // Fetch BLogs
  useEffect(() => {
    setIsBlogsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchUserBlogs({ slug, page }).then(({ blogs, pages }) => {
      setBlogState({ blogs, pages });
      setIsBlogsLoading(false);
    });
  }, [page, slug]);

  const { user, followers } = userState;
  const { blogs, pages } = blogState;

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
      ) : blogs.length === 0 ? (
        <Typography variant='h2' align='center'>
          No blogs!
          <span role='img' aria-label='meh'>
            🙄
          </span>
        </Typography>
      ) : (
        blogList
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
  follows: state.auth.follows,
  authId: state.auth._id,
});

const mapDispatchToProps = (dispatch) => ({
  onFollowUser: (id) => dispatch(followUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
