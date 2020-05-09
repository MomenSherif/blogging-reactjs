import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

import { DropzoneArea } from 'material-ui-dropzone';
import Dante from 'Dante2';

import { addBlog, editBlog } from '../../redux/actions/blogs';
import { BACKEND_BASE_URL } from '../../config';
import { fetchBlog } from '../../api/helper';
import useStyles from './BlogFormStyle';

const BlogForm = ({ onAddBlog, onEditBlog }) => {
  const { slug } = useParams();
  const history = useHistory();

  const isEditMode = slug ? true : false;
  const [formState, setFormState] = useState(() => ({
    loading: isEditMode,
    _id: null,
    body: null,
    title: '',
    tags: [],
    file: null,
    imgPreview: null,
  }));

  const { body, _id, imgPreview, title, tags, file, loading } = formState;

  useEffect(() => {
    if (isEditMode)
      fetchBlog(slug)
        .then((blog) => {
          setFormState({
            loading: false,
            _id: blog._id,
            body: JSON.parse(blog.body),
            title: blog.title,
            tags: blog.tags,
            imgPreview: `${BACKEND_BASE_URL}${blog.photo}`,
          });
        })
        .catch((e) => {
          history.replace('/');
        });
  }, []);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      title,
    }));
  };

  const handleTagsChange = (event, newTags) => {
    setFormState((prevState) => ({
      ...prevState,
      tags: newTags.length > 6 ? tags : newTags,
    }));
  };

  const handleFileChange = (files) => {
    const file = files[0];
    const reader = new FileReader();
    if (file) reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFormState((prevState) => ({
        ...prevState,
        file,
        imgPreview: reader.result,
      }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || body.blocks.length === 1) return;

    // Handle Edit Submit
    if (isEditMode)
      return onEditBlog(_id, {
        title,
        body: JSON.stringify(body),
        tags,
        photo: file,
      }).then((slug) => {
        if (slug) history.replace(`/blogs/${slug}`);
      });

    // Handle Add Sumbit
    if (!file) return;

    onAddBlog({
      title,
      body: JSON.stringify(body),
      tags,
      photo: file,
    }).then((slug) => {
      if (slug) history.replace(`/blogs/${slug}`);
    });
  };

  const handleChange = (editor) => {
    setFormState((prevState) => ({
      ...prevState,
      body: editor.emitSerializedOutput(),
    }));
  };

  const classes = useStyles();

  return (
    <Container maxWidth='md' className={classes.container}>
      {!loading && (
        <form onSubmit={handleSubmit}>
          <Box marginBottom={5}>
            <Typography
              variant='h2'
              component='h1'
              align='center'
              color='primary'
              gutterBottom
            >
              {`${isEditMode ? 'Edit' : 'Add'} Blog`}
            </Typography>
            <TextField
              id='title'
              name='title'
              InputLabelProps={{ style: { fontSize: 36 } }}
              label='Title'
              rowsMax={2}
              value={title}
              onChange={handleTitleChange}
              fullWidth
              style={{ paddingTop: 10 }}
              inputProps={{ style: { fontSize: 52, fontWeight: 'bold' } }}
            />
          </Box>
          <Box marginBottom={5} textAlign='center'>
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
              content={body}
              widgets={[]}
              classes={classes.test}
              onChange={handleChange}
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
            {isEditMode ? 'Save' : 'Add'}
          </Button>
        </form>
      )}
    </Container>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAddBlog: (blog) => dispatch(addBlog(blog)),
  onEditBlog: (id, updates) => dispatch(editBlog(id, updates)),
});

export default connect(null, mapDispatchToProps)(BlogForm);
