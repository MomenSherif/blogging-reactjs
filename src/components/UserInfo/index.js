import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

import moment from 'moment';

import woman from '../../assets/woman.svg';
import man from '../../assets/man.svg';
import useStyles from './UserInfoStyle';

const UserInfo = ({
  user,
  followers,
  isFollowing,
  handleUserFollow,
  isFollowHidden,
}) => {
  const classes = useStyles();
  return (
    <Grid container alignItems='center' spacing={5}>
      <Grid item xs>
        <Grid item container alignItems='center'>
          <Typography variant='h4' className={classes.userName}>
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          {!isFollowHidden && (
            <Chip
              label={isFollowing ? 'Following' : 'Follow'}
              variant={isFollowing ? 'default' : 'outlined'}
              color='primary'
              clickable
              onClick={handleUserFollow}
            />
          )}
        </Grid>
        <Typography
          variant='body2'
          color='textSecondary'
          className={classes.mb}
        >
          Member since {moment(user.createdAt).format('MMMM YYYY')} ❤
        </Typography>
        <Grid item>
          <Typography
            variant='overline'
            color='textSecondary'
            component='span'
            className={classes.followings}
          >
            {user.follows.length} Followings
          </Typography>
          <Typography variant='overline' color='textSecondary' component='span'>
            {followers} Folowers
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Box
          component='img'
          src={user.gender === 'male' ? man : woman}
          className={classes.img}
        />
      </Grid>
    </Grid>
  );
};

UserInfo.defaultProps = {
  isFollowHidden: false,
};

export default UserInfo;
