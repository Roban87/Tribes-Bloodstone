const initialState = {
  troops: [],
  troopsLoad: false,
  upgradeLoad: false,
};

export default function setTroopsReducer(state = initialState, action) {
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
    case 'UPGRADE_LOADING':
      return {
        ...state,
        upgradeLoad: true,
      };
    case 'TROOPS_LOADING':
      return {
        ...state,
        troopsLoad: true,
      };
    case 'UPGRADE':
      return {
        ...state,
        upgradeLoad: false,
        troops: state.troops.map((troop) => {
          if (troop.id === action.payload.id) {
            return action.payload;
          }
          return troop;
        }),
      };
    case 'UPGRADE_FAILED':
      return {
        ...state,
        upgradeLoad: false,
      };
    default:
      return state;
  }
}
