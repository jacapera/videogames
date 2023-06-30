require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre } = require('../../db');
const { API_KEY } = process.env;

const getVideoGameById = async (idVideogame) => {

  // Función para buscar videogame en la BD
  const findGameBD = async (idVideogame) => {
    return await Videogame.findOne({
      where: { id: idVideogame}, include:[Genre]
    })
  };

  // Función para buscar videogame en la API
  const findGameAPI = async (idVideogame) => {
    try {
      const {data} = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
      const gameObj = {
        id: data.id,
        name: data.name,
        description: data.description,
        platforms: data.platforms,
        image: data.background_image,
        released: data.released,
        rating: data.rating,
        genres: data.genres,
      }
      return gameObj;
    } catch (error) {
      return null;
    }
  };

  // Función para lógica de buscar
  const searchGame = async (idVideogame) => {
    if(idVideogame.includes("-")){
      let error;
      const gameFound = await findGameBD(idVideogame);
      if(!gameFound){
        error = new Error(`El videogame con id: ${idVideogame} no se encuentra en la BD`);
        error.statusCode = 404;
        throw error;
      }
      return gameFound;
    } else {
      const gameApi = await findGameAPI(idVideogame);
      //gameApi.then(response => console.log(response.data)).catch(error => console.log('error', error))
      //console.log(gameApi);
      // Lógica para agregar game a BD
      // ---------------------------------------------------------
      // const [game, created] = await Videogame.findOrCreate({
      //   where: { id: gameApi.id },
      //   defaults: gameApi
      // })
      if(gameApi){
        return gameApi;
      } else {
        error = new Error(`El videogame con id: ${idVideogame} no se encuentra en la API`);
        error.statusCode = 404;
        throw error;
      }
    }
  };

  // Ahora ejecuto searchGame para finalmente retornar el videogame encontrado
  const game = await searchGame(idVideogame);
  return game;
};

module.exports = getVideoGameById;