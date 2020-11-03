const initialState = {
  upgradeError: '',
  buildingsError: '',
  resourceError: '',
  rulesError: '',
  message: '',
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
    case 'UPGRADE_ERROR':
      return {
        ...state,
        upgradeError: action.payload,
      };
    case 'UPGRADE':
      return {
        ...state,
        upgradeError: '',
      };
    case 'SET_BUILDINGS':
      return {
        ...state,
        upgradeError: '',
      };
    case 'REMOVE_UPGRADE_ERROR':
      return {
        ...state,
        upgradeError: '',
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
    default:
      return state;
  }
}
