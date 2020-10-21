const initialState = {
  message: '',
};

export default function errorReducer(state = initialState, action) {
  if (action.type === 'SET_ERROR') {
    return {
      ...state,
      message: action.message,
    };
  }
  return state;
}
