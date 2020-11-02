const initialState = {
  isAuthenticated: false,
  token: '',
  userName: '',
};

const loginReducer = (state = initialState, action) => {
  if (action.type === 'LOGIN_STARTED') {
    return initialState;
  }

  if (action.type === 'LOGIN_SUCCESS') {
    return {
      ...state,
      isAuthenticated: true,
      token: action.token,
      userName: action.user,
    };
  }

  return state;
};

export default loginReducer;
