require('dotenv').config();
const axios = require('axios');
//const { Videogame } = require('../../db');
const { API_KEY } = process.env;

const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getVideoGames = async () => {
  // Lógica para traer 100 games de la api y se guardan en la BD
  // ------------------------------------------------------------------------------
  // for(let i = 1; i < 6; i++){
  //   let apiData = await axios.get(`${URL}&page=${i}`);
  //     const pageGames = apiData.data.results.map(game => {
  //       return {
  //         id:`${uuidv4()}-${data.id}`,
  //         idGameRawg: game.id,
  //         name: game.name,
  //         descripcion: game.description,
  //         plataformas: game.platforms,
  //         imagen: game.background_image,
  //         fechaDeLanzamiento: game.released
  //       }
  //     });
  //     videogames = [...videogames, ...pageGames];
  //   }
    // Actualizara los campos especificados en updateOnDuplicate del registro duplicado
    // ------------------------------------------------------------------------------
    // const games = await Videogame.bulkCreate(videogames, {
      //   updateOnDuplicate: ['descripcion', 'plataformas', 'imagen', 'fechaDeLanzamiento'],
      //   onConflict: { columns: ['id','idGameRawg']}
      // });

      // Los registros duplicados se ignorarán y no se realizara ninguna actualización en la tabla
      // ------------------------------------------------------------------------------
      // const games = await Videogame.bulkCreate(videogames, {
        //   onConflict: { doNothing: true},
        // });

  const { data } = await axios.get(`${URL}`);
  let videogames = data.results.map(game => {
    return {
      idGameRawg: game.id,
      name: game.name,
      descripcion: game.description,
      plataformas: game.platforms,
      imagen: game.background_image,
      fechaDeLanzamiento: game.released
    }
  });
  console.log(videogames.length);
  return videogames;
};

module.exports = getVideoGames;


