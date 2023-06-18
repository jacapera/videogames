require ('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame } = require('../../db');
const { Op } = require('sequelize');

const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

// Se trae 15 games de la api, al igual que en la BD, pero se retorna de la api por ahora
const getVideoGamesByName = async (name) => {
  if(!name){
    const error = new Error('Debe ingresar un nombre para buscar el Videogame');
    error.statusCode = 400;
    throw error;
  }
  const formattedName = name.toLowerCase();
  // Busqueda en la API
  const {data} = await axios.get(`${URL}&search=${encodeURIComponent(formattedName)}&search_precise=true&page_size=15`);
  const gamesByName = data.results.map(game => {
    return {
      idGameRawg: game.id,
      name: game.name,
      descripcion: game.description,
      plataformas: game.platforms,
      imagen: game.background_image,
      fechaDeLanzamiento: game.released
    }
  });

  // Busqueda en la BD
  const dbResults = await Videogame.findAll({
    where:{
      name:{
        [Op.iLike]: `%${formattedName}%`
      }
    }, limit: 15
  });

  if(gamesByName.length){
    //console.log(gamesByName.length);
    return gamesByName;
  } else if (dbResults.length){
    //console.log(dbResults.length);
    return dbResults;
  } else {
    const error = new Error(`No se encontro ningun juego que contenga la palabra ${name}`);
    error.statusCode = 404;
    throw error;
  }
};

module.exports = getVideoGamesByName;