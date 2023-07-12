const getVideoGames = require('./videoGameControllers/getVideoGames');
const getVideoGamesByName = require('./videoGameControllers/getVideoGamesByName');
const getVideoGameById = require('./videoGameControllers/getVideoGameById');
const getGenres = require('./genreControllers/getGenres');
const postVideoGame = require('./videoGameControllers/postVideoGame');
const getPlatforms = require('./genreControllers/getPlatforms');
const updateVideoGame = require('./videoGameControllers/updateVideoGame');
const deleteVideoGame = require('./videoGameControllers/deleteVideoGame');
const getRatingTopVideoGames = require('./videoGameControllers/getRatingTopVideoGames');

module.exports = {
  getVideoGames,
  getVideoGamesByName,
  getVideoGameById,
  getGenres,
  getPlatforms,
  postVideoGame,
  updateVideoGame,
  deleteVideoGame,
  getRatingTopVideoGames
}