import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Header from './layout/Header';
import Home from './pages/Home';
import BlogForm from './pages/BlogForm';
import Blog from './pages/Blog';
import WhatFollowersSay from './pages/WhatFollowersSay';
import Registeration from './pages/Registeration';
import User from './pages/User';

const App = ({ success, message, error, errors, isAutherized }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { pathname } = useLocation();

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
        <Route path='/blogs/add' component={BlogForm} />
        <Route path='/blogs/edit/:slug' component={BlogForm} />
        <Route path='/blogs/:slug' component={Blog} />
      </Switch>

      {isAutherized && pathname !== '/blogs/add' && (
        <Tooltip title='Add Blog' aria-label='add blog'>
          <Fab
            color='primary'
            aria-label='add blog'
            style={{ position: 'fixed', right: 40, bottom: 40 }}
            component={Link}
            to='/blogs/add'
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  success: state.status.success,
  message: state.status.message,
  error: state.status.error,
  errors: state.status.errors,
  isAutherized: !!state.auth.token,
});

export default connect(mapStateToProps)(App);
