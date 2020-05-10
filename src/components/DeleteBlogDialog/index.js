import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import DialogContentText from '@material-ui/core/DialogContentText';
import LinearProgress from '@material-ui/core/LinearProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import { deleteBlog } from '../../redux/actions/blogs';
import useStyles from './DeleteBlogDialogStyle';

const DeleteBlogDialog = ({ _id, title, onDelete }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirmed = () => {
    setIsSubmitting(true);
    onDelete()
      .then(() => {
        history.replace('/');
      })
      .catch((e) => setIsSubmitting(false));
  };

  const classes = useStyles();
  return (
    <Fragment>
      <Tooltip title='Delete Blog!' aria-label='delete blog' arrow>
        <Fab
          color='inherit'
          aria-label='delete'
          size='medium'
          className={classes.deleteIcon}
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth='xs'
        fullWidth
      >
        {isSubmitting && <LinearProgress />}
        <DialogTitle id='alert-dialog-title'>
          Confirm Delete
          <span role='img' aria-label='make sure!'>
            ☝
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Delete Blog "{title}"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Disagree
          </Button>
          <Button
            onClick={handleDeleteConfirmed}
            color='primary'
            size='small'
            disabled={isSubmitting}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch, { _id }) => ({
  onDelete: () => dispatch(deleteBlog(_id)),
});
export default connect(null, mapDispatchToProps)(DeleteBlogDialog);
