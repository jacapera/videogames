const getVideoGames = require('./videoGameControllers/getVideoGames');
const getVideoGamesByName = require('./videoGameControllers/getVideoGamesByName');
const getVideoGameById = require('./videoGameControllers/getVideoGameById');
const getGenres = require('./genreControllers/getGenres');


module.exports = {
  getVideoGames,
  getVideoGamesByName,
  getVideoGameById,
  getGenres,
}