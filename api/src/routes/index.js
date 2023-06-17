require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY} = process.env;
const { Videogame } = require('../db')
const { v4: uuidv4 } = require('uuid');

const URL = 'https://api.rawg.io/api/games';

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', async (req, res) => {
  try {
    let videogames = [];
    for(let i = 1; i < 6; i++){
      let apiData = await axios.get(`${URL}?key=${API_KEY}&page=${i}`);
      const pageGames = apiData.data.results.map(game => {
        return {
          idRawg: game.id,
          name: game.name,
          descripcion: game.description,
          plataformas: game.platforms,
          imagen: game.background_image,
          fechaDeLanzamiento: game.released
        }
      });
      videogames = [...videogames, ...pageGames];
    }
    const games = await Videogame.bulkCreate(videogames)
    console.log(games.length);
    res.status(200).json(games);
    return games;
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.get('/videogames/:idVideogame', async (req, res) => {
  try {
    const { idVideogame } = req.params;
    const { data } = await axios.get(`${URL}/${idVideogame}?key=${API_KEY}`);
    const gameObj = {
      id: uuidv4(),
      name: data.name,
      descripcion: data.description,
      plataformas: data.platforms,
      imagen: data.background_image,
      fechaDeLanzamiento: data.released
    }
    const game = await Videogame.create(gameObj);
    console.log(game);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
