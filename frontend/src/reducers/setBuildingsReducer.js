const initialState = [];

export default function setBuildingsReducer(state = initialState, action) {
  if (action.type === 'SET_BUILDINGS') {
    return action.payload;
  }
  return state;
}
