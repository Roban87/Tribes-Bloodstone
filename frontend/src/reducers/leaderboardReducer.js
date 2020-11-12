const initialState = {
  leaderboardBuildings: [],
  leaderboardTroops: [],
};

const leaderboardReducer = (state = initialState, action) => {
  if (action.type === 'SET_LEADERBOARD_BUILDINGS') {
    return {
      ...state,
      leaderboardBuildings: action.payload,
    };
  }
  return state;
};

export default leaderboardReducer;
