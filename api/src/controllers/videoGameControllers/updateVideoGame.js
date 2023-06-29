const { Op } = require('sequelize');
const { Videogame, Genre } = require('../../db');
const formatDate = require('../../helpers/formatDate');



const updateVideoGame = async (id, changes) => {
  const { name, description, platforms, image, released, rating, genres } = changes;
  // Validación por si no se encuentra un genero para asociar
  const genresFound = await Genre.findAll( {where: { name: {[Op.in]:genres} }} );
  if(genresFound.length === 0){
    const error = new Error('No se encontraron los géneros que quieres actualizar');
    error.statusCode = 404;
    throw error;
  }
  const gameChange = {
    name,
    description,
    platforms:platforms.map(item => {return{platform:{name: item}}}),
    image,
    released:formatDate(released),
    rating,
  }
  await Videogame.update(gameChange, {
    where: { id }
  });
  const gameUpdated = await Videogame.findByPk(id);
  await gameUpdated.setGenres(genresFound)
  const result = await Videogame.findOne({
    where: { name: gameChange.name },
    include: [Genre],
  });
  return result;
};


module.exports = updateVideoGame;