import React, { useState, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Dante from 'Dante2';
import moment from 'moment';

import { BACKEND_BASE_URL } from '../../config';
import { fetchBlog } from '../../api/helper';
import useStyles from './BlogStyle';

const Blog = ({ authId }) => {
  const [blog, setBlog] = useState(null);
  const { slug } = useParams();

  const classes = useStyles();

  const tagList = blog?.tags.map((tag, i) => (
    <Chip
      key={i}
      label={tag}
      size='medium'
      color='primary'
      clickable
      component={Link}
      className={classes.tag}
      to={`/blogs/search?tag=${tag}`}
    />
  ));

  useEffect(() => {
    fetchBlog(slug)
      .then((blog) => setBlog(blog))
      .catch((e) => {
        //not found page
        console.log(e);
      });
  }, [slug]);

  return (
    <Box>
      {!blog ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          <Container maxWidth='md' className={classes.header}>
            <Grid container alignItems='center' justify='space-between'>
              <Typography variant='h2' component='h1' className={classes.title}>
                {blog.title}
              </Typography>
              {authId === blog.author._id && (
                <Fab
                  color='secondary'
                  aria-label='edit'
                  component={Link}
                  to={`/blogs/edit/${blog.slug}`}
                >
                  <EditIcon />
                </Fab>
              )}
            </Grid>
            <Grid container spacing={1} alignItems='center'>
              <Grid item>
                <Avatar className={classes.avatar}>
                  {blog.author.firstName.charAt(0)}
                  {blog.author.lastName.charAt(0)}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography
                  variant='body1'
                  component={Link}
                  to={`/users/${blog.author.slug}`}
                  display='block'
                  className={classes.author}
                >{`${blog.author.firstName} ${blog.author.lastName}`}</Typography>
                <Typography variant='caption' color='textSecondary'>
                  {moment(blog.createdAt).format('MMM D, YYYY')}
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <Box
            className={classes.heroImage}
            style={{
              backgroundImage: `url("${BACKEND_BASE_URL}${blog.photo}")`,
            }}
          ></Box>
          <Container maxWidth='md' className={classes.content}>
            <Dante read_only={true} content={JSON.parse(blog.body)} />
            {tagList}
          </Container>
        </Fragment>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  authId: state.auth._id,
});

export default connect(mapStateToProps)(Blog);