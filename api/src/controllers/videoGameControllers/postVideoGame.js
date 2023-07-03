const { Op } = require('sequelize');
const { Videogame, Genre } = require('../../db');
const formatDate = require('../../helpers/formatDate');

const postVideoGame = async (game) => {
  const { name, description, platforms, image, released, rating, genres } = game;
  // Validación de name valido
  if(!name){
    const error = new Error('It requires a valid name');
    error.statusCode = 400;
    throw error;
  }
  // Validación para campos nulos de los atributos de Videogame
  if(!description || !platforms || !image || !released || !rating){
    const error = new Error('Se requiere información para todos los campos del videogame a crear');
    error.statusCode = 400;
    throw error;
  }
  // Validacion si viene genres null o vacio
  if(!genres || genres.length === 0){
    const error = new Error('Se debe asociar al menos un genero');
    error.statusCode = 400;
    throw error;
  }
  // Validación por si no se encuentra un genero para asociar
  const genresFound = await Genre.findAll({
    where: { name: {[Op.in]:genres}}
  })
  if(genresFound.length === 0){
    const error = new Error('No se encontraron los géneros asociados');
    error.statusCode = 404;
    throw error;
  }
  // Validación por si existe un videogame con el mismo nombre
  const gameFound = await Videogame.findOne({ where:{name} });
  if(gameFound){
    const error = new Error(`Ya existe un videogame con el nombre ${name}`);
    error.statusCode = 400;
    throw error;
  }

  // Definiendo objeto para crear un nuevo Videogame
  const newGameObj = {
    name,
    description,
    platforms:platforms.map(item => {return{platform:{name: item}}}),
    image,
    released:formatDate(released),
    rating,
  }
  // Creando Videogame a partir del objeto newGameObj
  const newGame = await Videogame.create(newGameObj)
  // Agregando la relacion de genero
  await newGame.addGenres(genresFound);
  // construyendo el nuevo juego con los generos asociados
  const newGameGenres = await Videogame.findOne({
    where: { name: newGameObj.name },
    include: [Genre],
  })
  return {newGameGenres, message:"Video juego creado con !exito"};
};

module.exports = postVideoGame;