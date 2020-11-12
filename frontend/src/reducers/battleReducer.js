const initialState = {
  stat: {
    message: '',
    myKingdom_troops: 0,
    myKingdom_died_troops: 0,
    myKingdom_buildings_lost: 'none',
    enemy_troops: 0,
    enemy_died_troops: 0,
    enemy_buildings_lost: 'none',
    resourceChange: {
      gold: 0,
      food: 0,
    },
  },
  battleLoad: false,
  modalState: false,
};

const battleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BATTLE':
      return {
        ...state,
        stat: action.payload.stat,
        battleLoad: false,
      };
    case 'CLEAR_BATTLE_STATS':
      return {
        initialState,
      };
    case 'BATTLE_LOADING':
      return {
        ...state,
        battleLoad: true,
      };
    case 'BATTLE_ERROR':
      return {
        ...state,
        battleLoad: false,
      };
    case 'OPEN_BATTLE_MODAL':
      return {
        ...state,
        modalState: true,
      };
    case 'CLOSE_BATTLE_MODAL':
      return {
        ...state,
        modalState: false,
      };
    case 'CLEAR_BATTLE_RESULTS':
      return {
        ...state,
        stat: {
          message: '',
          myKingdom_troops: 0,
          myKingdom_died_troops: 0,
          myKingdom_buildings_lost: 'none',
          enemy_troops: 0,
          enemy_died_troops: 0,
          enemy_buildings_lost: 'none',
          resourceChange: {
            gold: 0,
            food: 0,
          },
        },
      };
    default:
      return state;
  }
};

export default battleReducer;
