import React, { Fragment } from 'react';
import { Container, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const BlogSkeleton = () => {
  return (
    <Fragment>
      <Container style={{ marginBottom: 50 }}>
        <Skeleton variant='text' animation='wave' width='60%' height={70} />
        <Grid
          container
          alignItems='center'
          spacing={3}
          style={{ marginTop: 5 }}
        >
          <Grid item>
            <Skeleton
              variant='circle'
              animation='wave'
              width={50}
              height={50}
            />
          </Grid>
          <Grid item xs>
            <Skeleton variant='text' animation='wave' width='20%' height={20} />
            <Skeleton variant='text' animation='wave' width='10%' />
          </Grid>
        </Grid>
      </Container>
      <Skeleton variant='rect' animation='wave' width='100%' height={300} />
      <Container style={{ marginTop: 50 }}>
        <Skeleton variant='text' animation='wave' width='80%' height={70} />
        <Skeleton variant='text' animation='wave' width='40%' />
        <Skeleton variant='text' animation='wave' width='40%' />
        <Skeleton variant='text' animation='wave' width='40%' />
        <Skeleton variant='text' animation='wave' width='40%' />
      </Container>
    </Fragment>
  );
};

export default BlogSkeleton;
