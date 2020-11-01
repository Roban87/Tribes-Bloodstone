const initialState = {
  foodAmount: 0,
  foodGeneration: 0,
  goldAmount: 0,
  goldGeneration: 0,
  errorMessage: '',
};

const resourcesReducer = (state = initialState, action) => {
  if (action.type === 'SET_RESOURCES') {
    return {
      ...state,
      foodAmount: action.resourcesArray[0].amount,
      foodGeneration: action.resourcesArray[0].generation,
      goldAmount: action.resourcesArray[1].amount,
      goldGeneration: action.resourcesArray[1].generation,
    };
  }
  if (action.type === 'SET_ERROR') {
    return {
      ...state,
      errorMessage: action.error,
    };
  }
  return state;
};

export default resourcesReducer;
