const initialState = {
  logs: [],
};

const constructionLogReducer = (state = initialState, action) => {
  if (action.type === 'ADD_BUILDING') {
    return {
      ...state,
      logs: [...state.logs, action.payload],
    };
  }
  if (action.type === 'UPGRADE_BUILDING') {
    return {
      ...state,
      logs: [...state.logs, action.payload],
    };
  }
  if (action.type === 'ADD_TROOP') {
    return {
      ...state,
      logs: [...state.logs, action.payload],
    };
  }
  if (action.type === 'UPGRADE_TROOP') {
    return {
      ...state,
      logs: [...state.logs, action.payload],
    };
  }
  return state;
};

export default constructionLogReducer;
