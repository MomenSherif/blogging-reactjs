const authenticationReducerDefaultValue = {
  token: null,
  _id: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  slug: '',
  createdAt: null,
  updatedAt: null,
};

const authenticationReducer = (
  state = authenticationReducerDefaultValue,
  action
) => {
  switch (action.type) {
    case 'SET_AUTH_DETAILS':
      return { ...action.details };
    default:
      return state;
  }
};

export default authenticationReducer;
