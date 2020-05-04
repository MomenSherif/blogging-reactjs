import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import man from '../../assets/signup-man.svg';

import useStyles from './SignUpFormStyle';
const SignUpForm = () => {
  const [gender, setGender] = useState('');
  const handleChange = (e) => {
    console.log(e.target.value);

    setGender(e.target.value);
  };

  const classes = useStyles();
  return (
    <form noValidate style={{ width: '100%' }}>
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
            id='fisrtName'
            name='fisrtName'
            label='First Name'
            variant='standard'
            size='small'
            fullWidth
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
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='gender'>Gender</InputLabel>
            <Select
              labelId='gender'
              id='gender'
              value={gender}
              onChange={handleChange}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
          </FormControl>
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

export default SignUpForm;
