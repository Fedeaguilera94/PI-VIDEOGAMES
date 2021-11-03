const axios = require("axios");
const { Genre } = require("../src/db");
const { API_KEY } = process.env;

const getAllGenres = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = response.data.results;
    genres.forEach(async (g) => {
      await Genre.findOrCreate({
        where: {
          name: g.name,
        },
      });
    });
    const allGenres = await Genre.findAll();
    res.send(allGenres);
  } catch (err) {
    console.log(err);
  }
};

module.exports = getAllGenres;
