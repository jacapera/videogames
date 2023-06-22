const { GET_VIDEOGAMES, GET_VIDEOGAME_NAME, ERROR, RESET_ERROR, GET_GENRES, FILTER_GENRE, GET_PLATFORMS } = require("./action-type");

const initialState = {
  allVideoGames : [],
  copyAllVideoGames: [],
  allGenres: [],
  allPlatforms:[],
  error: "",
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch ( type ) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideoGames: payload,
        copyAllVideoGames: payload,
        error:"",
      }
    case GET_VIDEOGAME_NAME:
      return {
        ...state,
        allVideoGames: payload,
        error:"",
      }
    case GET_GENRES:
      return {
        ...state,
        allGenres: payload,
        error:"",
      }
    case FILTER_GENRE:
      const allVideoGamesFiltered = state.copyAllVideoGames.filter(game =>
        game.genres.some(genre => genre.name === payload)
      );
      return {
        ...state,
        allVideoGames: allVideoGamesFiltered,
      }
    case GET_PLATFORMS:
      return {
        ...state,
        allPlatforms:payload,
        error:"",
      }
    case ERROR:
      return {
        ...state,
        error: payload
      }
    case RESET_ERROR:
      return {
        ...state,
        error: payload,
      }
    default:
      return {
        ...state
      }
  };
};

module.exports = reducer;