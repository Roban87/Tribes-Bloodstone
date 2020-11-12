const initialState = {
  username: '',
  kingdomId: 0,
  kingdomName: '',
  location: '',
  lastBattle: undefined,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        username: action.payload.username,
        kingdomId: action.payload.kingdomId,
        kingdomName: action.payload.kingdomName,
        location: action.payload.location,
      };
    case 'SET_LAST_BATTLE':
      return {
        ...state,
        lastBattle: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
