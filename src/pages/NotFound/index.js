import React from 'react';

import { Box } from '@material-ui/core';

import notFoundImg from '../../assets/404.png';

const NotFound = () => {
  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Box
        component='img'
        src={notFoundImg}
        alt='Not Found Page!'
        maxWidth='100%'
        height='100%'
      />
    </Box>
  );
};

export default NotFound;
