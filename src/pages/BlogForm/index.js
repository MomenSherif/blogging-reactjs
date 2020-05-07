import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Dante from 'Dante2';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import { DropzoneArea } from 'material-ui-dropzone';

import { addBlog, editBlog } from '../../redux/actions/blogs';
import { BACKEND_BASE_URL } from '../../config';

import useStyles from './BlogFormStyle';

const BlogForm = ({ onAddBlog, onEditBlog, blog }) => {
  const [body, setBody] = useState(blog ? JSON.parse(blog.body) : null);
  const [title, setTitle] = useState(blog?.title || '');
  const [tags, setTags] = useState(blog?.tags || []);
  const [file, setFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(
    blog ? `${BACKEND_BASE_URL}${blog.photo}` : null
  );

  const history = useHistory();
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTagsChange = (event, newTags) => {
    setTags((tags) => (newTags.length > 6 ? tags : newTags));
  };

  const handleFileChange = (files) => {
    const file = files[0];
    setFile(file);
    const reader = new FileReader();
    if (file) reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
  };

  const saveHandler = (editorContext, content) => {
    setBody(content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || body.blocks.length === 1) return;

    // Handle Edit Submit
    if (blog)
      return onEditBlog(blog._id, {
        title,
        body: JSON.stringify(body),
        tags,
        photo: file,
      }).then((slug) => {
        if (slug) history.replace(`/${slug}`);
      });

    // Handle Add Sumbit
    if (!file) return;

    onAddBlog({
      title,
      body: JSON.stringify(body),
      tags,
      photo: file,
    }).then((slug) => {
      if (slug) history.replace(`/${slug}`);
    });
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
            {`${blog ? 'Edit' : 'Add'} Blog`}
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
          <DropzoneArea
            onChange={handleFileChange}
            acceptedFiles={['image/*']}
            filesLimit={1}
            dropzoneText='Drag & Drop image here or click'
            maxFileSize={1000 * 1000}
            showPreviewsInDropzone={false}
            dropzoneClass={classes.dropZone}
          />

          {imgPreview && (
            <Box
              component='img'
              maxWidth='100%'
              marginTop={3}
              src={imgPreview}
              alt={file?.name}
            />
          )}
        </Box>
        <Box marginBottom={5}>
          <Dante
            body_placeholder={
              "Blog content, Don't forget to highlight to style"
            }
            {...danteProps}
            // content={JSON.parse(blog?.body)}
            content={body}
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
          disabled={!title || body?.blocks.length === 1 || !imgPreview}
          type='submit'
          className={classes.submitBtn}
        >
          {blog ? 'Save' : 'Add'}
        </Button>
      </form>
    </Container>
  );
};

const mapStateToProps = (state, { match }) => ({
  blog: match.params.slug
    ? state.blogs.blogs.find((b) => b.slug === match.params.slug)
    : null,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAddBlog: (blog) => dispatch(addBlog(blog)),
  onEditBlog: (id, updates) => dispatch(editBlog(id, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm);
