export const loginStartedAction = () => ({
  type: 'LOGIN_STARTED',
});

export const loginSuccessAction = (token, user) => ({
  type: 'LOGIN_SUCCESS',
  token,
  user,
});
