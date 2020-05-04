import React, { Fragment } from 'react';
import { useSnackbar } from 'notistack';
import { Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Header from './layout/Header';

function App() {
  const { enqueueSnackbar } = useSnackbar();

  // setTimeout(() => {
  //   enqueueSnackbar('Hello, Youtube', {
  //     variant: 'success',
  //     autoHideDuration: 2000,
  //   });

  //   enqueueSnackbar('Bye, Youtube', {
  //     variant: 'error',
  //     autoHideDuration: 2000,
  //   });
  // }, 200);

  return (
    <Fragment>
      <Header />
      <Switch>
        <Container></Container>
      </Switch>
    </Fragment>
  );
}

export default App;
