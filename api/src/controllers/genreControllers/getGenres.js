require('dotenv').config();
const axios = require('axios');
const { Genre } = require('../../db');
const { API_KEY } = process.env;
const { v4: uuidv4 } = require('uuid');

const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;

// Se trae todos los genres de la api, se guardan en BD y se retorna de BD
const getGenres = async () => {
  let genresApi = [];
  const {data} = await axios.get(`${URL}`);
  genresApi = data.results.map(genre => {
      return {
        name: genre.name,
      }
  });
  const genresBD = await Genre.bulkCreate(genresApi,{
    onConflict: { doNothing: true },
  });
  const allGenresBD = await Genre.findAll();
  return allGenresBD;
};

module.exports = getGenres;
