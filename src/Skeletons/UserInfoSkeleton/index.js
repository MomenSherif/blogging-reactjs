import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

const UserInfoSkeleton = () => {
  return (
    <Grid container spacing={3}>
      <Grid item container direction='column' xs>
        <Skeleton variant='rect' animation='wave' width={250} />
        <Skeleton
          variant='text'
          animation='wave'
          width={100}
          style={{ marginTop: 10, marginBottom: 20 }}
        />
        <Skeleton variant='text' animation='wave' width={150} />
      </Grid>
      <Grid item xs style={{ marginLeft: 30 }}>
        <Skeleton variant='circle' animation='wave' width={100} height={100} />
      </Grid>
    </Grid>
  );
};

export default UserInfoSkeleton;
