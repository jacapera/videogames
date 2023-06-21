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
        idGenreRawg: genre.id,
        name: genre.name,
      }
  });
  // Recorremos genresApi y buscamos en nuestra tabla Genre si exite alguno que venga de la api
  for (const genre of genresApi) {
    const existingGenre = await Genre.findOne({
      where: { idGenreRawg: genre.idGenreRawg }
    });
    // Si no existe el genero lo agregamos a nuestra tabla Genre
    if (!existingGenre) {
      await Genre.create(genre);
    }
  }
  // Buscamos los generos que existan en nuestra BD y los retornamos
  const genresBD = await Genre.findAll();
  return genresBD;
};

module.exports = getGenres;
