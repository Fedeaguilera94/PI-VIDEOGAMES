const { Videogame, Platform, Genre } = require("../db");
const { API_KEY } = process.env;

const axios = require("axios");

const getGameId = async (req, res) => {
  const { id } = req.params;
  try {
    if (id.includes("-")) {
      const gameDB = await Videogame.findOne({
        where: { id },
        include: [Genre, Platform],
      });
      return res.json(gameDB);
    }

    const gameAPI = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    res.json(gameAPI.data);
  } catch (err) {
    res.status(404).json({ error: "Id not found" });
  }
};

module.exports = getGameId;
