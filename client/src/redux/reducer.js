const { GET_VIDEOGAMES, GET_VIDEOGAME_NAME, ERROR, RESET_ERROR, GET_GENRES, FILTER_GENRE, GET_PLATFORMS, POST_VIDEOGAME, ORDER_CARD, ISLOADING, FILTER_BY_NAME } = require("./action-type");

const initialState = {
  allVideoGames : [],
  copyAllVideoGames: [],
  allGenres: [],
  allPlatforms:[],
  gameCreated:{},
  isLoading: true,
  error: "",
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  //console.log(payload)
  switch ( type ) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideoGames: payload,
        copyAllVideoGames: payload,
        isLoading:false,
        error:"",
      }
      // Busqueda por nombre en el backend
      case GET_VIDEOGAME_NAME:
      return {
          ...state,
          allVideoGames: payload,
          error:"",
        }
      // Filtrando por nombre en el Frontend
      case FILTER_BY_NAME:
        const allGameCopy = [...state.allVideoGames].filter(game => game.name.toLowerCase().includes(payload.toLowerCase()));
        if(!allGameCopy.length){
          return{...state, error: `El Video juego ${payload} no se encuentra en esta sección...intenta buscarlo en el listado general`}
        }
        return {
          ...state,
          allVideoGames: allGameCopy,
        }
    case GET_GENRES:
      return {
        ...state,
        allGenres: payload,
        error:"",
      }


    case FILTER_GENRE:
      let allVideoGamesFiltered = [];
      // Traigo a todos
      if(payload === "All") return {...state, allVideoGames: state.copyAllVideoGames}
      // Valido si
      if(state.allVideoGames.length === state.copyAllVideoGames){
        allVideoGamesFiltered = state.copyAllVideoGames.filter(game =>
          game.genres.some(genre => genre.name === payload)
        );
      }else {
        allVideoGamesFiltered = state.allVideoGames.filter(game => game.genres.some(genre => genre.name === payload))
        console.log('aqui', allVideoGamesFiltered);
      }

      if(!allVideoGamesFiltered.length) return{
        ...state,
        error: `No se encontro el video juego con genero ${payload}`,
        allVideoGames:state.copyAllVideoGames,
      }

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
    case ISLOADING:
      return {
        ...state,
        isLoading: payload,
      }
    default:
      return {
        ...state
      }
  };
};

module.exports = reducer;