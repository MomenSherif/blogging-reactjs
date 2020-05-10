import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import zombieHead from '../assets/zombie-heade.svg';
import woman from '../assets/woman.svg';
import man from '../assets/man.svg';

const Header = ({ isAuthenticated, gender, slug }) => {
  const location = useLocation();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // reset active to home page after login
  useEffect(() => {
    if (location.pathname === '/') setValue(0);
  }, [location.pathname]);

  return (
    <AppBar position='sticky' color='default' elevation={3}>
      <Container maxWidth='lg'>
        <Grid container alignItems='center'>
          <Typography
            variant='h5'
            component={Link}
            to='/'
            color='primary'
            style={{ textDecoration: 'none', fontWeight: 'bold' }}
            onClick={() => setValue(0)}
          >
            BlogZone
            <Box
              component='img'
              src={zombieHead}
              marginLeft='5px'
              marginRight='30px'
              style={{ height: 40, verticalAlign: 'bottom' }}
            />
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            style={{ flex: 1 }}
            component='nav'
            scrollButtons='auto'
          >
            <Tab label='Home' component={Link} to='/' />
            {isAuthenticated && (
              <Tab
                label='What followers say!'
                component={Link}
                to='/followed'
              />
            )}

            <Tooltip title='Looking for something?' arrow aria-label='search'>
              <Tab
                component={Link}
                to='/blogs/search'
                icon={<SearchIcon />}
                style={{ marginLeft: 'auto' }}
              />
            </Tooltip>
            <Tab
              component={Link}
              to={isAuthenticated ? `/users/${slug}` : '/auth/sign-up'}
              icon={
                <Box
                  component='img'
                  src={
                    !isAuthenticated ? man : gender === 'female' ? woman : man
                  }
                  style={{ height: 50 }}
                  onClick={() => setValue(2)}
                />
              }
            />
          </Tabs>
        </Grid>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
  gender: state.auth.gender,
  slug: state.auth.slug,
});
export default connect(mapStateToProps)(Header);
