import store from '../redux/store';
import { onFailure } from '../redux/actions/status';

/**
 * Global async catch error
 * @param {async function} fn
 */
const catchErrors = (fn) => {
  return (dispatch) => {
    return fn(dispatch).catch((error) => {
      const { message } = error.response?.data;
      if (message) store.dispatch(onFailure([message]));
      else {
        const errors = error.response?.data.map((err) => err.message);
        store.dispatch(onFailure(errors));
      }
    });
  };
};

export default catchErrors;
