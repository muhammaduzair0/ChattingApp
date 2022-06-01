export const setUserData = payload => {
  return {
    type: 'SET_USER',
    payload: payload,
  };
};

export const setUserMessage = payload => {
  return {
    type: 'SET_MESSAGES',
    payload: payload
  }
}
