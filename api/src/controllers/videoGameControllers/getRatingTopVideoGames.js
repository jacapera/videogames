require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;

const getRatingTopVideoGames = async () => {
 //let GamesRatingApi = [];
  const { data } = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
  RatingVideoGamesApi = data.results.filter(item => item.rating > 4.5);
  return RatingVideoGamesApi;
};

module.exports = getRatingTopVideoGames;
