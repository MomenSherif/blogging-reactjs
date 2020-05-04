import React from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import man from '../../assets/signup-man.svg';

import useStyles from './SignInFormStyle';
const SignInForm = () => {
  const classes = useStyles();
  return (
    <form noValidate style={{ width: '100%' }}>
      <Typography variant='h3' color='primary' gutterBottom>
        Sign In
        <Box
          component='img'
          src={man}
          display='inline'
          className={classes.manIcon}
        />
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            id='email'
            name='email'
            label='Email'
            variant='standard'
            type='email'
            size='small'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='password'
            name='password'
            label='Password'
            variant='standard'
            type='password'
            size='small'
            fullWidth
          />
        </Grid>
        <Button
          variant='contained'
          color='primary'
          className={classes.submitBtn}
          fullWidth
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default SignInForm;
