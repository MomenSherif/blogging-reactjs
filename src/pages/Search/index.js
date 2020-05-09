import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'querystring';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { fetchSearchedBlogs, debounce } from '../../api/helper';
import BlogCard from '../../components/BlogCard';

import useStyles from './SearchStyle';
const Search = () => {
  const [blogs, setBlogs] = useState([]);
  const { search } = useLocation();
  const [searchState, setSearchState] = useState(() => ({
    title: '',
    author: '',
    tag: queryString.parse(search)['?tag'] || '',
  }));

  const [isSearching, setIsSearching] = useState(true);

  const onChange = (field, value) => {
    setIsSearching(true);
    setSearchState((prevState) => ({ ...prevState, [field]: value }));
  };

  const debounceOnChange = debounce(onChange, 500);

  useEffect(() => {
    fetchSearchedBlogs({
      author: searchState.author,
      title: searchState.title,
      tag: searchState.tag,
    }).then((blogs) => {
      setBlogs(blogs);
      setIsSearching(false);
    });
  }, [searchState]);

  const blogList = blogs.map((blog) => <BlogCard key={blog._id} {...blog} />);
  const classes = useStyles();
  return (
    <Container maxWidth='md' className={classes.container}>
      <Typography variant='h2' component='h1' color='primary'>
        Search ☯
      </Typography>
      <Grid container spacing={5} className={classes.inputsContainer}>
        <Grid item sm>
          <TextField
            id='title'
            name='title'
            label='Title'
            fullWidth
            onChange={(e) => debounceOnChange('title', e.target.value)}
          />
        </Grid>
        <Grid item sm>
          <TextField
            id='author'
            name='author'
            label='Author'
            fullWidth
            onChange={(e) => debounceOnChange('author', e.target.value)}
          />
        </Grid>
        <Grid item sm>
          <TextField
            id='tag'
            name='tag'
            label='Tag'
            fullWidth
            onChange={(e) => debounceOnChange('tag', e.target.value)}
          />
        </Grid>
      </Grid>

      {isSearching ? (
        <Box display='flex' flexDirection='column' alignItems='center'>
          <CircularProgress />
        </Box>
      ) : blogList.length === 0 ? (
        <Typography variant='h4' align='center' color='secondary'>
          No Result Found!
        </Typography>
      ) : (
        blogList
      )}
    </Container>
  );
};

export default Search;
