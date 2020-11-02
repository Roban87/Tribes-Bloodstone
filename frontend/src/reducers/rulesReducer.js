const initialState = {
  rules: {},
};

const setRulesReducer = (state = initialState, action) => {
  if (action.type === 'SET_RULES') {
    return {
      ...state,
      rules: action.payload,
    };
  }
  return state;
};

export default setRulesReducer;
