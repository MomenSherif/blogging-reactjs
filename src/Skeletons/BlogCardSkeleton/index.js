import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

const BlogCardSkeleton = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Skeleton
          variant='rect'
          height={250}
          animation='wave'
          style={{
            borderRadius: 30,
            width: '100%',
          }}
        />
      </Grid>
      <Grid item xs={6} container direction='column' justify='center'>
        <Skeleton height={36} animation='wave' style={{ marginBottom: 20 }} />
        <Skeleton animation='wave' />
        <Skeleton animation='wave' />
        <Skeleton animation='wave' width='50%' />
        <Grid item container alignItems='flex-start' style={{ marginTop: 24 }}>
          <Skeleton variant='circle' animation='wave' width={40} height={40} />
          <Skeleton animation='wave' width='20%' style={{ marginLeft: 8 }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogCardSkeleton;
