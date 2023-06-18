const { Videogame } = require('../../db');
const { v4:uuidv4 } = require('uuid');

const postVideoGame = async (game, genres) => {
  const { name, descripcion, plataformas, imagen, fechaDeLanzamiento } = game;
  if(!name || !descripcion || !plataformas || !imagen || !fechaDeLanzamiento){
    const error = new Error('Se requiere información para todos los campos del videogame a crear');
    error.statusCode = 400;
    throw error;
  }
  if(!genres){
    const error = new Error('Se debe asociar al menos un genero');
    error.statusCode = 400;
    throw error;
  }
  const newGame = await Videogame.create(game)
};

module.exports = postVideoGame;