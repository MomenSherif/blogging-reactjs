import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, useLocation, Redirect } from 'react-router-dom';

import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import PrivateRoute from './helper_components/PrivateRoute';
import WhatFollowersSay from './pages/WhatFollowersSay';
import Registeration from './pages/Registeration';
import BlogForm from './pages/BlogForm';
import NotFound from './pages/NotFound';
import Header from './layout/Header';
import Search from './pages/Search';
import Home from './pages/Home';
import Blog from './pages/Blog';
import User from './pages/User';

const App = ({ isAuthenticated }) => {
  const { pathname } = useLocation();

  return (
    <Fragment>
      <Header />
      <Switch>
        <PrivateRoute path='/followed' component={WhatFollowersSay} />
        <PrivateRoute path='/users/:slug' component={User} />
        <PrivateRoute path='/blogs/add' exact component={BlogForm} />
        <PrivateRoute path='/blogs/edit/:slug' component={BlogForm} />
        <PrivateRoute path='/blogs/search' component={Search} />
        <Route path='/' exact component={Home} />
        <Route path='/blogs/:slug' component={Blog} />
        <Route path='/auth/sign-up' component={Registeration} />
        <Route path='/auth/sign-in' component={Registeration} />
        <Redirect from='/auth' exact to='/auth/sign-up' />
        <Route path='*' component={NotFound} />
      </Switch>

      {/* Hide if not Authenticated or in add || edit page */}
      {isAuthenticated && !pathname.match(/blogs\/(add|edit)/) && (
        <Tooltip title='Add Blog' aria-label='add blog' arrow>
          <Fab
            color='primary'
            aria-label='add blog'
            style={{ position: 'fixed', right: 40, bottom: 40, zIndex: 9999 }}
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
  isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps)(App);
