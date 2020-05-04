const statusReducerDefaultValue = {
  success: null,
  message: null,
  error: null,
  errors: null,
};

const statusReducer = (state = statusReducerDefaultValue, action) => {
  switch (action.type) {
    case 'LOADING':
      return statusReducerDefaultValue;
    case 'SUCCESS':
      return {
        ...state,
        success: true,
        message: action.message,
      };
    case 'ERROR':
      return {
        ...state,
        error: true,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default statusReducer;
