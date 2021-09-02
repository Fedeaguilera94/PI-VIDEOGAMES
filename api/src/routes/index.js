const { Router } = require("express");
require("dotenv").config();
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Genre, Videogame } = require("../db");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//______________________________________________________________________________
const getGames = async () => {
  const url = [
    await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`), // solo trae 20
    await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
    await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
    await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
    await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`),
  ];
  let apiGame = [];
  for (let i = 0; i < url.length; i++) {
    for (let j = 0; j < url[i].data.results.length; j++) {
      apiGame.push(url[i].data.results[j]);
    }
  }

  apiGame = apiGame.map((game) => {
    let genre = game.genres.map((g) => {
      return {
        slug: g.slug,
        name: g.name,
      };
    });
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      Genres: genre,
      rating: game.rating,
      released: game.released,
    };
  });
  return apiGame;
};

const dataBase = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"], // traigo el nombre del genero
      through: {
        // comprobacion
        atrributes: [],
      },
    },
  });
};

const getAllGames = async () => {
  const apiData = await getGames(); // devuelvo todo la pi
  const dbInfo = await dataBase();
  const total = apiData.concat(dbInfo);
  return total;
};

router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  let totalGames = await getAllGames();
  if (name) {
    let searchGame = totalGames.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );
    searchGame.length
      ? res.status(200).send(searchGame)
      : res.status(404).send("Game not found");
  } else {
    res.status(200).json(totalGames);
  }
});
//_________________________________________________

/* router.get("/genre", async (req, res) => {
  const genresDb = await Genre.findAll();
  if (genresDb.length) return res.send("Hay generos en la DB");

  const apiData = await axios.get(
    `https://api.rawg.io/api/genre?key=${API_KEY}`
  );
  const genres = apiData.data.results;
  genres.forEach(async (g) => {
    await Genre.findOrCreate({
      where: {
        name: g.name,
      },
    });
  });
  res.json(genres);
}); */

router.get("/genres", async (req, res) => {
  const genresDb = await Genre.findAll();
  if (genresDb.length) return res.send("Genres in DB");

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
  res.json(genres);
});

module.exports = router;
