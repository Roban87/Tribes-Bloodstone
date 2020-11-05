export const loginStartedAction = () => ({
  type: 'LOGIN_STARTED',
});

export const loginSuccessAction = (token) => ({
  type: 'LOGIN_SUCCESS',
  token,
});

export const logoutAction = () => ({
  type: 'LOGOUT',
});

export const setSessionAction = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return logoutAction();
  }
  return loginSuccessAction(token);
};
