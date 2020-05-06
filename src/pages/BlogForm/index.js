import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';

import Dante from 'Dante2';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

import useStyles from './BlogFormStyle';
import { Box } from '@material-ui/core';

const BlogForm = () => {
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTagsChange = (event, newTags) => {
    setTags((tags) => (newTags.length > 6 ? tags : newTags));
  };

  const saveHandler = (editorContext, content) => {
    setContent(content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const danteProps = {
    data_storage: {
      url: 'xxx',
      save_handler: saveHandler,
    },
  };

  const classes = useStyles();

  return (
    <Container maxWidth='md' className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Box marginBottom={5}>
          <Typography
            variant='h2'
            component='h1'
            align='center'
            color='primary'
            gutterBottom
          >
            Add Blog
          </Typography>
          <TextField
            id='title'
            name='title'
            InputLabelProps={{ style: { fontSize: 36 } }}
            label='Title'
            rowsMax={2}
            value={title}
            fullWidth
            onChange={handleTitleChange}
            style={{ paddingTop: 10 }}
            inputProps={{ style: { fontSize: 52, fontWeight: 'bold' } }}
          />
        </Box>
        <Box marginBottom={5}>
          <Dante
            body_placeholder={
              "Blog content, Don't forget to highlight to style"
            }
            {...danteProps}
            widgets={[]}
          />
        </Box>
        <Box marginBottom={5}>
          <Autocomplete
            id='tags'
            multiple
            options={[]}
            freeSolo
            disableClearable
            value={tags}
            onChange={handleTagsChange}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant='outlined'
                  color='primary'
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                name='tags'
                label='Tags'
                placeholder='Add tags'
                InputLabelProps={{
                  style: { fontSize: 36, position: 'relative' },
                }}
              />
            )}
          />
        </Box>
        <Button
          variant='contained'
          color='primary'
          size='large'
          fullWidth
          disabled={!title || content.blocks.length === 1}
          type='submit'
        >
          Add
        </Button>
      </form>
    </Container>
  );
};

export default BlogForm;
