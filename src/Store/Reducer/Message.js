const initialState = {
  message: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return {
        ...state,
        message: [...state.message, ...action.payload],
      };
    default: {
      return state;
    }
  }
};

export default messageReducer;
