import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store';
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
