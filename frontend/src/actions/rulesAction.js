import fetchDataGeneral from '../utilities/generalFetch';
import setErrorMessage from './errorActions';

export const setRules = (rules) => ({
  type: 'SET_RULES',
  rules,
});

export function setRulesAsync() {
  return ((dispatch) => {
    const endpoint = '/rules';
    fetchDataGeneral(endpoint, 'GET')
      .then((results) => { dispatch({ type: 'SET_RULES', payload: results }); })
      .catch((err) => dispatch(setErrorMessage(err.message)));
  });
}
