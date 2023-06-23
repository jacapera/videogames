require ('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../../db');
const { Op } = require('sequelize');

const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

// Se trae 15 games de la api, al igual que en la BD, pero se retorna de la api por ahora
const getVideoGamesByName = async (name) => {
  console.log('aqui', name)
  if(!name){
    const error = new Error('Debe ingresar un nombre para buscar el Videogame');
    error.statusCode = 400;
    throw error;
  }
  const formattedName = name.toLowerCase();
  // Busqueda en la API
  const {data} = await axios.get(`${URL}&search=${encodeURIComponent(formattedName)}&search_precise=true&page_size=150`);
  const gamesByName = data.results.map(game => {
    return {
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.platforms,
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres,
    }
  });

  // Busqueda en la BD
  const dbResults = await Videogame.findAll({
    where:{
      name:{
        [Op.iLike]: `%${formattedName}%`
      }
    }, limit: 15, include:[Genre]
  });
  const result = [...gamesByName, ...dbResults];
  return result;
};

module.exports = getVideoGamesByName;