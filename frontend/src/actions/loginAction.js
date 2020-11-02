import fetchDataGeneral from '../utilities/generalFetch';

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
    try {
      const loginResponse = await fetchDataGeneral(endpoint, method, loginData);

      if (!loginResponse.token) {
        return dispatch(loginErrorAction(loginResponse.message));
      }

      return dispatch(loginSuccessAction(loginResponse.token, userName));
    } catch (error) {

    }
  };
};
