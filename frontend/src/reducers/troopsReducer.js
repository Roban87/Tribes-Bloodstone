const initialState = {
  troops: [],
  troopsLoad: false,
  upgradeLoad: false,
};

export default function troopsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TROOPS':
      return {
        ...state,
        troopsLoad: false,
        troops: action.payload,
      };
    case 'TROOPS_ERROR':
      return {
        ...state,
        troopsLoad: false,
      };
    case 'UPGRADE_TROOP_LOADING':
      return {
        ...state,
        upgradeLoad: true,
      };
    case 'TROOPS_LOADING':
      return {
        ...state,
        troopsLoad: true,
      };
    case 'UPGRADE_TROOP':
      return {
        ...state,
        upgradeLoad: false,
        troops: state.troops.map((troop) => {
          for (let i = 0; i < action.payload.troops.length; i += 1) {
            if (troop.id === action.payload.troops[i].id) {
              return action.payload.troops[i];
            }
            return troop;
          }
          return null;
        }),
      };
    case 'UPGRADE_TROOP_ERROR':
      return {
        ...state,
        upgradeLoad: false,
      };
    default:
      return state;
  }
}
