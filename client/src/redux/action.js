import {
  ERROR,
  FILTER_GENRE,
  GENRE_FILTER,
  GET_GENRES,
  GET_VIDEOGAMES,
  GET_VIDEOGAME_NAME,
  RESET_ERROR
} from "./action-type";
import axios from "axios";


export const getVideoGames = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3005/videogames');
      const data = await response.json();
      console.log(data[0])
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: data
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.message
      })
    }
  };
};

export const getVideoGameByName = (name) => {
  return async (dispatch) => {
    try {
      // const response = await fetch(`http://localhost:3005/videogames/name?name=${name}`);
      // const data = await response.json();
      const { data } = await axios.get(`http://localhost:3005/videogames/name?name=${name}`);
      //console.log('aqui en action', data)
      /*
      * Usando fetch no me entrega error y todo biene por la data lo cual no va entrar al catch
      * debo aplicar la siguente logica que esta comentada.
      */
      // if(data.message){
      //   return dispatch({
      //     type: ERROR,
      //     payload:data.message,
      //   })
      // } else {
      //   return dispatch({
      //     type: GET_VIDEOGAME_NAME,
      //     payload: data,
      //   })
      // }
      return dispatch({
        type: GET_VIDEOGAME_NAME,
        payload: data,
      })
    } catch (error) {
      console.log(error)
      return dispatch({
        type: ERROR,
        payload: error.response.data.message,
      })
    }
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3005/genres`);
      return dispatch({
        type: GET_GENRES,
        payload: data
      })
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.response.data.message,
      })
    }
  };
};

export const resetError = () => {
  return {
    type: RESET_ERROR,
    payload: "",
  }
};


export const filterGenre = (genre) => {
  return {
    type: FILTER_GENRE,
    payload: genre,
  }
}