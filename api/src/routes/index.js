const { Router } = require("express");
require("dotenv").config();
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllGenres } = require("../../controllers/genre");
const axios = require("axios");
const { Genre, Videogame, Platform } = require("../db");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const platforms = require("./platforms");
const videogame = require("./videogame");
const videogames = require("./videogames");
const videogameId = require("./videogameId");
const genre = require("./genre");

router.use("/platforms", platforms);
router.use("/videogame", videogame);
router.use("/videogames", videogames);
router.use("/videogame/:id", videogameId);
router.use("/genre", genre);
//______________________________________________________________________________
/* const getGames = async () => {
  let apiGame = [];
  // &page_size=50&page= PROBAR!!!!!!!
  const url1 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=1`
  );
  const url2 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
  );
  const url3 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
  );
  const url4 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
  );
  const url5 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
  );

  apiGame = url1.data.results.concat(
    url2.data.results,
    url3.data.results,
    url4.data.results,
    url5.data.results
  );

  apiGame = apiGame.map((game) => {
    const plataformas = game.platforms.map((g) => g.platform);
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      genres: game.genres,
      platforms: plataformas,

      rating: game.rating,
      released: game.released,
    };
  });
  return apiGame;
};

const dataBase = async () => {
  return await Videogame.findAll({
    include: [Genre, Platform],
    // traigo el nombre del genero
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
      : res.status(404).json({ msg: "Game not Found" });
  } else {
    res.status(200).json(totalGames);
  }
});

router.get("/genres", async (req, res) => {
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
});

router.get("/platforms", async (req, res) => {
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
});

router.post("/videogame", async (req, res) => {
  let { name, description, releaseDate, rating, genres, platforms, created } =
    req.body;

  let gameCreated = await Videogame.create({
    name,
    description,
    releaseDate,
    rating: rating || 1,
    //platforms,
    created,
    //genres,
  });

  let dbGenre = await Genre.findAll({
    where: { name: genres },
  });
  let dbPlatform = await Platform.findAll({
    where: { name: platforms },
  });
  gameCreated.addGenres(dbGenre);
  gameCreated.addPlatforms(dbPlatform);

  res.status(200).send(gameCreated);
});

//____________________________________________________

router.get("/videogames/:id", async (req, res) => {
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
});
//____________________________________________________ */
module.exports = router;
