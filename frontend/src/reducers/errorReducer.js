const initialState = {
  upgradeError: '',
  buildingsError: '',
  addBuildingError: '',
  resourceError: '',
  rulesError: '',
  addTroopError: '',
  message: '',
  loginError: '',
  kingdomsError: '',
  registerMapError: '',
  battleError: '',
  leaderboardError: '',
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        message: action.message,
      };
    case 'BUILDINGS_ERROR':
      return {
        ...state,
        buildingsError: action.payload,
      };
    case 'ADD_BUILDING_ERROR':
      return {
        ...state,
        addBuildingError: action.payload,
      };
    case 'UPGRADE_ERROR':
      return {
        ...state,
        upgradeError: action.payload,
      };
    case 'UPGRADE_BUILDING':
      return {
        ...state,
        upgradeError: '',
      };
    case 'SET_BUILDINGS':
      return {
        ...state,
        buildingsError: '',
      };
    case 'REMOVE_UPGRADE_ERROR':
      return {
        ...state,
        upgradeError: '',
      };
    case 'REMOVE_ADD_BUILDING_ERROR':
      return {
        ...state,
        addBuildingError: '',
      };
    case 'RESOURCE_ERROR':
      return {
        ...state,
        resourceError: action.payload,
      };
    case 'SET_RESOURCES':
      return {
        ...state,
        resourceError: '',
      };
    case 'RULES_ERROR':
      return {
        ...state,
        rulesError: action.payload,
      };
    case 'SET_RULES':
      return {
        ...state,
        rulesError: '',
      };
    case 'ADD_TROOP_ERROR':
      return {
        ...state,
        addTroopError: action.payload,
      };
    case 'REMOVE_ADD_TROOP_ERROR':
      return {
        ...state,
        addTroopError: '',
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        loginError: action.payload,
      };
    case 'LOGIN_STARTED':
      return {
        ...state,
        loginError: '',
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loginError: '',
      };
    case 'KINGDOMS_ERROR':
      return {
        ...state,
        kingdomsError: action.payload,
      };
    case 'SET_KINGDOMS':
      return {
        ...state,
        kingdomsError: '',
      };
    case 'BATTLE_ERROR':
      return {
        ...state,
        battleError: action.payload,
      };
    case 'BATTLE':
      return {
        ...state,
        battleError: '',
      };
    case 'CLEAR_BATTLE_ERROR':
      return {
        ...state,
        battleError: '',
      };
    case 'SET_LEADERBOARD_BUILDINGS':
      return {
        ...state,
        leaderboardError: '',
      };
    case 'LEADERBOARD_ERROR':
      return {
        ...state,
        leaderboardError: action.payload,
      };
    default:
      return state;
  }
}
