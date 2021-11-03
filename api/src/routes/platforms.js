const { Platform } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getPlatform = async (req, res) => {
  try {
    const platformsApi = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    const plataformas = platformsApi.data.results;
    plataformas.forEach(async (g) => {
      await Platform.findOrCreate({
        where: {
          name: g.name,
        },
      });
    });
    const platformsDataBase = await Platform.findAll();
    res.json(platformsDataBase);
  } catch (err) {
    res.send(err);
  }
};

module.exports = getPlatform;
