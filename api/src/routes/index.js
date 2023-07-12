const controllers = require('../controllers/index');
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
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

router.get('/videogames', async (req, res) => {
  try {
    return res.status(200).json(await controllers.getVideoGames());
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
});

router.get('/genres', async (req, res) => {
  try {
    return res.status(200).json(await controllers.getGenres());
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
});

router.get('/platforms', async (req, res) => {
  try {
    return res.status(200).json(await controllers.getPlatforms());
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
});

router.get('/rating', async(req, res) => {
  try {
    return res.status(200).json(await controllers.getRatingTopVideoGames());
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
});

router.post('/videogames', async (req, res) => {
  try {
    return res.status(200).json(await controllers.postVideoGame(req.body));
  } catch (error) {
    return error.statusCode
      ? res.status(error.statusCode).json({message: error.message})
      : res.status(500).json({ message: error.message })
  }
});

router.put('/videogames/:id', async (req, res) => {
  const { id } = req.params;
  try {
    return res.status(200).json(await controllers.updateVideoGame(id, req.body));
  } catch (error) {
    return error.statusCode
      ? res.status(error.statusCode).json({message: error.message})
      : res.status(500).json({ message: error.message })
  }
});

router.delete('/videogames/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.status(204).json(await controllers.deleteVideoGame(id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
