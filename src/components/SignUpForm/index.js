import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { object, string } from 'yup';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { signUp } from '../../redux/actions/authentication';
import man from '../../assets/signup-man.svg';
import useStyles from './SignUpFormStyle';

const schema = object().shape({
  firstName: string().required('First Name is required!'),
  lastName: string().required('Last Name is required!'),
  email: string()
    .email('Invalid Email Address!')
    .required('Email is required!'),
  password: string()
    .required('Password is required!')
    .min(6, 'Password must be at least 6 characters!'),
  gender: string().required('Gender is required!'),
});

const SignUpForm = ({ onSignUp }) => {
  const [gender, setGender] = useState('');
  const handleChange = (e) => {
    setGender(e.target.value);
  };

  const { register, handleSubmit, errors, formState } = useForm({
    validationSchema: schema,
    mode: 'onBlur',
  });

  const classes = useStyles();
  return (
    <form
      onSubmit={handleSubmit(onSignUp)}
      noValidate
      style={{ width: '100%' }}
    >
      <Typography variant='h3' color='primary' gutterBottom>
        Sign Up
        <Box
          component='img'
          src={man}
          display='inline'
          className={classes.manIcon}
        />
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <TextField
            id='firstName'
            name='firstName'
            label='First Name'
            variant='standard'
            size='small'
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            inputRef={register}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='lastName'
            name='lastName'
            label='Last Name'
            variant='standard'
            size='small'
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            inputRef={register}
          />
        </Grid>
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
        <Grid item xs={12}>
          <FormControl
            fullWidth
            name='gender'
            innerRef={register}
            error={!!errors.gender}
          >
            <InputLabel id='gender'>Gender</InputLabel>
            <Select
              labelId='gender'
              id='gender'
              name='gender'
              value={gender}
              onChange={handleChange}
              inputRef={register}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
            <FormHelperText>{errors.gender?.message}</FormHelperText>
            {/* Input help to add select box to schema validation */}
            <input type='hidden' value={gender} name='gender' ref={register} />
          </FormControl>
        </Grid>
        <Button
          variant='contained'
          color='primary'
          className={classes.submitBtn}
          type='submit'
          fullWidth
          disabled={formState.isSubmitting}
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onSignUp: (data) => dispatch(signUp(data)),
});

export default connect(null, mapDispatchToProps)(SignUpForm);
