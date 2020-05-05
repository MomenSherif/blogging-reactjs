import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import zombieHead from '../assets/zombie-heade.svg';
import man from '../assets/man.svg';
import woman from '../assets/woman.svg';

const Header = ({ isAuthenticated, gender, slug }) => {
  const location = useLocation();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // reset active to home page after login
  useEffect(() => {
    if (location.pathname === '/') setValue(0);
  }, [location, setValue]);

  return (
    <AppBar position='sticky' color='default' elevation={3}>
      <Container maxWidth='lg'>
        <Grid container alignItems='center'>
          <Typography
            variant='h5'
            component={Link}
            to='/'
            style={{ textDecoration: 'none' }}
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
          >
            <Tab label='Home' component={Link} to='/' />
            {isAuthenticated && (
              <Tab
                label='What followers say!'
                component={Link}
                to='/followed'
              />
            )}
            <Tab
              component={Link}
              to={isAuthenticated ? `/users/${slug}` : '/auth/sign-up'}
              style={{ marginLeft: 'auto' }}
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
