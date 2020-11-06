import fetchDataGeneral from '../utilities/generalFetch';
import { setRulesError } from './errorActions';

export const setRules = (rules) => ({
  type: 'SET_RULES',
  payload: rules,
});

export function setRulesAsync() {
  return ((dispatch) => {
    const endpoint = '/rules';
    fetchDataGeneral(endpoint, 'GET')
      .then((results) => { dispatch({ type: 'SET_RULES', payload: results }); })
      .catch((err) => dispatch(setRulesError(err.message)));
  });
}
