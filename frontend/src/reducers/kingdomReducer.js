const initialState = {
  kingdom: [],
};

export default function kingdomReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_KINGDOM':
      return {
        ...state,
        kingdom: action.payload,
      };
    default:
      return state;
  }
}
