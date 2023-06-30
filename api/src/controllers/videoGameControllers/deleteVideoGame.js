const { Videogame } = require('../../db');


const deleteVideoGame = async (id) => {
  const videoGameFound = await Videogame.findByPk(id);
  await videoGameFound.destroy();
};

module.exports = deleteVideoGame;