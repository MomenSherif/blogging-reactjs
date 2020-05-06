const authenticationReducerDefaultValue = {
  token: null,
  _id: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  slug: '',
  follows: null,
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
    case 'FOLLOW_USER':
      const isFollowing = state.follows.includes(action.id);
      const newFollows = isFollowing
        ? state.follows.filter((id) => id !== action.id)
        : [...state.follows, action.id];

      return {
        ...state,
        follows: newFollows,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
