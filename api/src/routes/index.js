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
  // VER TRY CATCH!!!!!!!!!!!!!!!
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

  let apiGame = [];
  apiGame = url1.data.results.concat(
    url2.data.results,
    url3.data.results,
    url4.data.results,
    url5.data.results
  );

  /*   for (let i = 0; i < url.length; i++) {
    for (let j = 0; j < url[i].data.results.length; j++) {
      // probar .FLAT()
      apiGame.push(url[i].data.results[j]);
    }
  } */

  apiGame = apiGame.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      genres: game.genres,

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
  /*   const genresDb = await Genre.findAll(); // compruebo si hay evito crear 2 veces
  if (genresDb.length) return res.send("Genres in DB"); */

  const response = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const genres = response.data.results;
  genres.forEach(async (g) => {
    await Genre.findOrCreate({
      // creo la tabla con name

      where: {
        name: g.name,
      },
    });
  });
  const allGenres = await Genre.findAll();
  res.send(allGenres);
});

//await Genre.bulkCreate(response) cambiar por forEACH

router.post("/videogame", async (req, res) => {
  let { name, description, releaseDate, rating, genres, platforms, created } =
    req.body;

  let gameCreated = await Videogame.create({
    name,
    description,
    releaseDate,
    rating,
    platforms,
    created,
    genres,
  });
  genres.forEach(async (g) => {
    let game = await Genre.findAll({
      where: {
        name: g,
      },
    });
    await gameCreated.addGenre(game);
  });

  res.send("created videoGame");
});

/*
let genDb = await Genre.findAll({
    where: { name: genres },
  });
  videogameCreated.addGenres(genDb);
  res.status(201).send("Tu Videojuego fué creado con éxito");
}),
*/

//____________________________________________________
router.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id.includes("-")) {
      const gameDB = await Videogame.findOne({
        where: { id },
        include: [Genre],
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
//____________________________________________________
module.exports = router;
