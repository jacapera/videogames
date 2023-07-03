const {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_NAME,
  ERROR,
  RESET_ERROR,
  GET_GENRES,
  FILTER_GENRE,
  GET_PLATFORMS,
  POST_VIDEOGAME,
  ORDER_CARD,
  ISLOADING,
  FILTER_BY_NAME,
  MESSAGE,
  ERROR_CHANGE,
  IS_MODAL_OPEN
} = require("./action-type");

const initialState = {
  allVideoGames : [],
  copyAllVideoGames: [],
  allGenres: [],
  allPlatforms:[],
  isLoading: true,
  error: "",
  message:"",
  isModalOpen: false,
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
          return {...state, error: `El Video juego "${payload}" no se encuentra☹️`}
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
      // Declaro mi arreglo auxiliar
      let allVideoGamesFiltered = [];
      // Traigo a todos
      if(payload === "All") return {...state, allVideoGames: state.copyAllVideoGames}
      // Valido si estoy con todos los video games para filtrarlos
      if(state.allVideoGames.length === state.copyAllVideoGames){
        // Filtro de la copia donde tengo todos mis video games
        allVideoGamesFiltered = state.copyAllVideoGames.filter(game =>
          game.genres.some(genre => genre.name === payload)
        );
      }else {
        // Si ya tengo filtro busco en lo que esta renderizado
        allVideoGamesFiltered = state.allVideoGames.filter(game => game.genres.some(genre => genre.name === payload))
        //console.log('aqui', allVideoGamesFiltered);
      }
      // Si no llego a encontra el video game seteo mi estado de error
      if(!allVideoGamesFiltered.length) return{
        ...state,
        error: `No se encontro el video juego con genero ${payload}`,
        //allVideoGames:state.copyAllVideoGames,
      }
      return {
        ...state,
        allVideoGames: allVideoGamesFiltered,
      }
    case ORDER_CARD:
      // Hago una copia de lo que esta renderizado
      const allCardsCopy = [...state.allVideoGames];
      return {
        ...state,
        allVideoGames:
          payload === "A-Z" ?
            allCardsCopy.sort((a, b) =>{return a.name.toUpperCase() < b.name.toUpperCase() ? -1
            : a.name.toUpperCase() > b.name.toUpperCase() ? 1 : 0})
          :payload === "Z-A" ?
            allCardsCopy.sort((a, b) => b.name.trim().toLowerCase().localeCompare(a.name.trim().toLowerCase()))
          :payload === "ratingMin" ?
            allCardsCopy.sort((a, b) => a.rating - b.rating)
          :allCardsCopy.sort((a, b) => b.rating - a.rating),
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
        message: payload.message,
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
    case ERROR_CHANGE:
      return {
        ...state,
        error: payload,
      }
    case ISLOADING:
      return {
        ...state,
        isLoading: payload,
      }
    case IS_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: payload,
      }
    case MESSAGE:
      return {
        ...state,
        message: payload,
      }
    default:
      return {
        ...state
      }
  };
};

module.exports = reducer;