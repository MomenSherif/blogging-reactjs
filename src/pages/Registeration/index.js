import React, { useState } from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Link, Route } from 'react-router-dom';

import useStyles from './RegisterationStyle';
import rick_morty from '../../assets/rick-morty.svg';

import SignUpForm from '../../components/SignUpForm';
import SignInForm from '../../components/SignInForm';

const Registeration = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  return (
    <Container maxWidth='xl' className={classes.container}>
      <Grid container spacing={5}>
        <Grid item sm={12} md={6} className={classes.bg}>
          <Box display='block' component='img' src={rick_morty} />
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          container
          direction='column'
          alignItems='center'
        >
          <Paper className={classes.paper}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              variant='fullWidth'
              centered
            >
              <Tab label='Sign Up' component={Link} to='/auth/sign-up' />
              <Tab label='Sign In' component={Link} to='/auth/sign-in' />
            </Tabs>
          </Paper>

          <Route path='/auth/sign-up' exact>
            <SignUpForm />
          </Route>
          <Route path='/auth/sign-in' exact>
            <SignInForm />
          </Route>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Registeration;
