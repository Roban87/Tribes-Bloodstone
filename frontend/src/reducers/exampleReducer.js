const initialState = {
  sum: 0,
  counts: [],
  error: ''
}

//with if statements
const exampleReducer = (state = initialState, action) => {
  if (action.type === 'ADD_TO_COUNT' ) {
    return {
      ...state,
      counts: [...state.counts, action.payload]
    }
  }
  if (action.type === 'GET_SUM' ) {
    return {
      ...state,
      sum: count.reduce((a, b) => { return a + b})
    }
  }
  if (action.type === 'SET_ERROR' ) {
    return {
      ...state,
      error: action.error
    };
  }
  return state;
};

export default exampleReducer;