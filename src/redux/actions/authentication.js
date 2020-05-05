import axios from '../../api/axios';
import catchErrors from '../../api/catchErrors';

const setAuthDetails = (details) => ({
  type: 'SET_AUTH_DETAILS',
  details,
});

const logIn = ({ email = '', password = '' } = {}) => {
  return catchErrors(async (dispatch) => {
    const { token, user } = await axios.post(
      'http://localhost:4000/users/login',
      {
        email,
        password,
      }
    );
    dispatch(setAuthDetails({ token, ...user }));
  });
};

export { logIn };
