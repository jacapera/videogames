require('dotenv').config();
const controllers = require('../controllers/index');
const { Router } = require('express');
const { Videogame, Genre } = require('../db')

const URL = 'https://api.rawg.io/api/';

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async (req, res) => {
  try {
    return res.status(200).json(await controllers.getVideoGames());
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
});

router.get('/videogames/name', async (req, res) => {
  try {
    const { name } = req.query;
    return res.status(200).json(await controllers.getVideoGamesByName(name));
  } catch (error) {
    return error.statusCode
      ? res.status(error.statusCode).json({message: error.message})
      : res.status(500).json({message: error.message})
  }
});

router.get('/videogames/:idVideogame', async (req, res) => {
  try {
    const { idVideogame } = req.params;
    return res.status(200).json(await controllers.getVideoGameById(idVideogame));
  } catch (error) {
    return error.statusCode
      ? res.status(error.statusCode).json({message: error.message})
      : res.status(500).json({ message: error.message })
  }
});

router.get('/genres', async (req, res) => {
  try {
    return res.status(200).json(await controllers.getGenres());
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
});

router.post('/videogames', async (req, res) => {
  try {
    const { game, genres } = req.body;
    const newGame = await Videogame.create(game)

  } catch (error) {
    
  }
});










module.exports = router;
