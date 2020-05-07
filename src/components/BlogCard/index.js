import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import moment from 'moment';

import man from '../../assets/man.svg';
import woman from '../../assets/woman.svg';
import useStyles from './BlogCardStyle';

import { BACKEND_BASE_URL } from '../../config';

const BlogCard = ({ authorHidden, ...blog }) => {
  const classes = useStyles();

  const content = JSON.parse(blog.body)
    .blocks.map((block) => (!block.text.trim() && '\n') || block.text)
    .join(' ');

  const tagList = blog.tags
    .slice(-3)
    .map((tag, i) => (
      <Chip
        key={i}
        label={tag}
        variant='outlined'
        size='small'
        color='primary'
        clickable
        component={Link}
        className={classes.tag}
        to={`/blogs/search?tag=${tag}`}
      />
    ));

  return (
    <Box className={classes.card}>
      <Grid container spacing={3}>
        <Grid item xs={6} component={Link} to={`/blogs/edit/${blog.slug}`}>
          <Box
            component='img'
            display='block'
            boxShadow={2}
            src={`${BACKEND_BASE_URL}${blog.photo}`}
            className={classes.img}
          />
        </Grid>
        <Grid item xs={6} container direction='column' justify='center'>
          <Typography
            variant='h5'
            component='h2'
            gutterBottom
            noWrap
            className={classes.wrapText}
          >
            <Link to={`/blogs/${blog.slug}`} className={classes.blogTitle}>
              {blog.title}
            </Link>
          </Typography>
          <Typography
            color='textSecondary'
            paragraph
            variant='subtitle2'
            className={classes.wrapText}
          >
            {`${content.substr(0, 300)} ${content.length > 300 && '......'}`}
          </Typography>

          {authorHidden ? (
            <BlogDate date={blog.createdAt} />
          ) : (
            <Grid item container alignItems='center' spacing={1}>
              <Grid item component={Link} to={`/users/${blog.author.slug}`}>
                <Box
                  component='img'
                  src={blog.author.gender === 'male' ? man : woman}
                  style={{ width: 25 }}
                />
              </Grid>
              <Grid item>
                <Typography variant='body1'>{`${blog.author.firstName} ${blog.author.lastName}`}</Typography>
                <BlogDate date={blog.createdAt} />
              </Grid>
            </Grid>
          )}
          <Box marginLeft='auto'>
            {blog.tags.length - tagList.length > 0 && '📌...'}
            {tagList}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const BlogDate = ({ date }) => (
  <Typography component='time' variant='caption' color='textSecondary'>
    {moment(date).format('MMM D, YYYY')}
  </Typography>
);

BlogCard.defaultProps = {
  authorHidden: false,
};

export default BlogCard;
