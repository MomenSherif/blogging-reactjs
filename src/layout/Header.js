import React, { useState } from 'react';

import { Link } from 'react-router-dom';
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

const Header = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position='sticky' color='default' elevation={3}>
      <Container>
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
            <Tab label='What followers say!' component={Link} to='/followed' />
            <Tab
              component={Link}
              to='/auth/sign-up'
              style={{ marginLeft: 'auto' }}
              icon={
                <Box
                  component='img'
                  src={man}
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

export default Header;
