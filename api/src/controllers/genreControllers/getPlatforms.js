require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;

const getPlatforms = async () => {
  let platformsApi = [];
  const { data } = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
  platformsApi = data.results.map(platform => {
    return {
      id: platform.id,
      name: platform.name,
    }
  });
  return platformsApi;
};

module.exports = getPlatforms;