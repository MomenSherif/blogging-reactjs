import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css'; // fix Dante style to support dark theme
import * as serviceWorker from './serviceWorker';

import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import ScrollToTop from './router_helpers/ScrollToTop';
import store from './redux/store';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';

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
