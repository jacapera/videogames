

const initialState = {
  allVideoGames : [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch ( type ) {
    default:
      return {
        ...state
      }
  };
};

module.exports = reducer;