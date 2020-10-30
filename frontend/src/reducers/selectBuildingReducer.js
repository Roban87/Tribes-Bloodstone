const initialState = {
  id: undefined,
  type: undefined,
  level: undefined,
  hp: undefined,
  startedAt: undefined,
  finishedAt: undefined,
  kingdomId: undefined,
};

const selectBuildingReducer = (state = initialState, action) => {
  if (action.type === 'SELECT_BUILDING') {
    return action.payload;
  }
  return state;
};

export default selectBuildingReducer;
