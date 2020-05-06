import axios from '../../api/axios';
import catchErrors from '../../api/catchErrors';
import { BACKEND_BASE_URL } from '../../config';

const setAuthDetails = (details) => ({
  type: 'SET_AUTH_DETAILS',
  details,
});

const logIn = ({ email = '', password = '' } = {}) => {
  return catchErrors(async (dispatch) => {
    const { token, user } = await axios.post(
      `${BACKEND_BASE_URL}/users/login`,
      {
        email,
        password,
      }
    );
    dispatch(setAuthDetails({ token, ...user }));
  });
};

const signUp = (date = {}) => {
  return catchErrors(async (dispatch) => {
    const { token, user } = await axios.post(`${BACKEND_BASE_URL}/users`, date);
    dispatch(setAuthDetails({ token, ...user }));
  });
};

const followUserSuccess = (id) => ({
  type: 'FOLLOW_USER',
  id,
});

const followUser = (id) => {
  return catchErrors(async (dispatch) => {
    await axios.post(`${BACKEND_BASE_URL}/users/${id}/follow`);
    dispatch(followUserSuccess(id));
  });
};

export { logIn, signUp, followUser };
