const initialState = {
  isAuthenticated: false,
  token: '',
};

const sessionReducer = (state = initialState, action) => {
  if (action.type === 'LOGIN_SUCCESS') {
    return {
      ...state,
      isAuthenticated: true,
      token: action.token,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      token: '',
    };
  }
  return state;
};

export default sessionReducer;
