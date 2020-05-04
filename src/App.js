import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';

import axios from './api/axios';
import Header from './layout/Header';
import Registeration from './pages/Registeration';

const App = ({ success, message, error, errors }) => {
  const { enqueueSnackbar } = useSnackbar();

  // Handle all snackbars messages from backed
  useEffect(() => {
    if (success) enqueueSnackbar(message, { variant: 'success' });
    else if (error)
      errors.forEach((err) =>
        enqueueSnackbar(err, { variant: 'error', autoHideDuration: 2000 })
      );
  }, [success, message, error, errors, enqueueSnackbar]);

  return (
    <Fragment>
      <Header />
      <Container>
        <Switch>
          <Route path='/auth' component={Registeration} />
        </Switch>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  success: state.status.success,
  message: state.status.message,
  error: state.status.error,
  errors: state.status.errors,
});

export default connect(mapStateToProps)(App);
