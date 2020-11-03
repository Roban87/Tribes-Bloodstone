const initialState = {
  buildings: [],
  buildingsLoad: false,
  upgradeLoad: false,
};

export default function buildingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BUILDINGS':
      return {
        ...state,
        buildingsLoad: false,
        buildings: action.payload,
      };
    case 'BUILDINGS_ERROR':
      return {
        ...state,
        buildingsLoad: false,
      };
    case 'UPGRADE_LOADING':
      return {
        ...state,
        upgradeLoad: true,
      };
    case 'BUILDINGS_LOADING':
      return {
        ...state,
        buildingsLoad: true,
      };
    case 'UPGRADE_ERROR':
      return {
        ...state,
        upgradeLoad: false,
        buildings: state.buildings.map((building) => {
          if (building.id === action.payload.id) {
            return action.payload;
          }
          return building;
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
