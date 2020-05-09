import React, { useState, useEffect } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';

import SignUpForm from '../../components/SignUpForm';
import SignInForm from '../../components/SignInForm';
import rick_morty from '../../assets/rick-morty.svg';
import useStyles from './RegisterationStyle';

const Registeration = ({ user }) => {
  const [value, setValue] = useState(0);
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (user) history.push('/');
  }, [user]);

  const classes = useStyles();
  return (
    <Container maxWidth='lg' className={classes.container}>
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

          <Route path='/auth/sign-up' exact component={SignUpForm} />
          <Route path='/auth/sign-in' exact component={SignInForm} />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth._id,
});

export default connect(mapStateToProps)(Registeration);
