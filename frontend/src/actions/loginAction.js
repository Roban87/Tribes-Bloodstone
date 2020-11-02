import fetchDataGeneral from '../utilities/generalFetch';
import { setLoginError } from './errorActions';

export const loginStartedAction = () => ({
  type: 'LOGIN_STARTED',
});

export const loginSuccessAction = (token, user) => ({
  type: 'LOGIN_SUCCESS',
  token,
  user,
});

export const loginFetchAsync = (userName, password) => {
  const endpoint = '/login';
  const method = 'POST';
  const loginData = {
    userName,
    password,
  };

  return async (dispatch) => {
    dispatch(loginStartedAction());
    try {
      const loginResponse = await fetchDataGeneral(endpoint, method, loginData);
      window.localStorage.token = loginResponse.token;
      return dispatch(loginSuccessAction(loginResponse.token, userName));
    } catch (error) {
      return dispatch(setLoginError(error.message));
    }
  };
};
