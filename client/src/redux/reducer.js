const { GET_VIDEOGAMES, GET_VIDEOGAME_NAME, ERROR, RESET_ERROR, GET_GENRES, FILTER_GENRE, GET_PLATFORMS, POST_VIDEOGAME, ORDER_CARD } = require("./action-type");

const initialState = {
  allVideoGames : [],
  copyAllVideoGames: [],
  allGenres: [],
  allPlatforms:[],
  gameCreated:{},
  error: "",
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(payload)
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
    case ORDER_CARD:
      const allCardsCopy = [...state.allVideoGames];
      return {
        ...state,
        allVideoGames:
          payload === "A-Z" ? allCardsCopy.sort((a, b) =>{return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : a.name.toUpperCase() > b.name.toUpperCase() ? 1 : 0}):
          payload === "Z-A" ? allCardsCopy.sort((a, b) => b.name.trim().toLowerCase().localeCompare(a.name.trim().toLowerCase())):
          payload === "ratingMin" ? allCardsCopy.sort((a, b) => a.rating - b.rating) :
          allCardsCopy.sort((a, b) => b.rating - a.rating),
      }
    case GET_PLATFORMS:
      return {
        ...state,
        allPlatforms:payload,
        error:"",
      }
    case POST_VIDEOGAME:
      return {
        ...state,
        gameCreated: payload,
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