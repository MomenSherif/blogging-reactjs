import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';

const StatusHanlder = ({ success, message, error, errors }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (success)
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 2000,
        preventDuplicate: true,
      });
    else if (error)
      errors.forEach((err) =>
        enqueueSnackbar(err, {
          variant: 'error',
          autoHideDuration: 2000,
          preventDuplicate: true,
        })
      );
  }, [success, message, error, errors]);

  return <Fragment />;
};

const mapStateToProps = (state) => ({
  success: state.status.success,
  message: state.status.message,
  error: state.status.error,
  errors: state.status.errors,
});

export default connect(mapStateToProps)(StatusHanlder);
