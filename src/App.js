import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import Header from './layout/Header';
import Home from './pages/Home';
import WhatFollowersSay from './pages/WhatFollowersSay';
import Registeration from './pages/Registeration';
import User from './pages/User';

const App = ({ success, message, error, errors }) => {
  const { enqueueSnackbar } = useSnackbar();

  // Handle all snackbars messages from backed
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
  }, [success, message, error, errors, enqueueSnackbar]);

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/followed' component={WhatFollowersSay} />
        <Route path='/users/:slug' component={User} />
        <Route path='/auth' component={Registeration} />
      </Switch>
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
