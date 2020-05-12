import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css'; // fix Dante style to support dark theme
import * as serviceWorker from './serviceWorker';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { lightBlue } from '@material-ui/core/colors';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import ScrollToTop from './helper_components/ScrollToTop';
import StatusHandler from './helper_components/StatusHandler';
import store from './redux/store';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: lightBlue,
    background: {
      default: '#212121',
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <CssBaseline />
          <ScrollToTop />
          <StatusHandler />
          <App />
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
