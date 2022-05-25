const initialState = {
  user: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
      break;
    default: {
      state;
    }
  }
};
export default accountReducer;
