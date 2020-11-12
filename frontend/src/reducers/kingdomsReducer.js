const initialState = {
  kingdoms: [],
  kingdomsLoad: false,
};

const kingdomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_KINGDOMS':
      return {
        ...state,
        kingdoms: action.payload.kingdoms,
        kingdomsLoad: false,
      };
    case 'KINGDOMS_LOAD':
      return {
        ...state,
        kingdomsLoad: true,
      };
    default:
      return state;
  }
};

export default kingdomsReducer;
