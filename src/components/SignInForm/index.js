import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { object, string } from 'yup';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { logIn } from '../../redux/actions/authentication';
import man from '../../assets/signup-man.svg';
import useStyles from './SignInFormStyle';

const schema = object().shape({
  email: string()
    .email('Invalid Email Address!')
    .required('Email is required!'),
  password: string()
    .required('Password is required!')
    .min(6, 'Password must be at least 6 characters!'),
});

const SignInForm = ({ onLogin }) => {
  const { register, handleSubmit, errors, formState } = useForm({
    validationSchema: schema,
    mode: 'onBlur',
  });

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit(onLogin)} noValidate style={{ width: '100%' }}>
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
            error={!!errors.email}
            helperText={errors.email?.message}
            inputRef={register}
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
            error={!!errors.password}
            helperText={errors.password?.message}
            inputRef={register}
          />
        </Grid>
        <Button
          variant='contained'
          color='primary'
          className={classes.submitBtn}
          fullWidth
          type='submit'
          disabled={formState.isSubmitting}
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onLogin: ({ email, password }) => dispatch(logIn({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignInForm);
