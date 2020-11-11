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
        troops: state.troops
          .map((troop) => {
            const found = action.payload.troops.find((mod) => mod.id === troop.id);
            return found || troop;
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
