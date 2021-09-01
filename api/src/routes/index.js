const { Router } = require("express");
const { API_KEY } = process.env;
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const {Genre,Videogame} = require("../db")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getGames = async () => {
  const url = await axios.get("https://api.rawg.io/api/games?key=903b185787cb45d0b35ec829534f5037");
  const info = await url.data.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      Genres: game.genres,
      rating: game.rating,
      released: game.released,
    };
  });
  return info;
};

const dataBase = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"], // traigo el nombre del genero
      through: {
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
    const {name} = req.query;
    let totalGames = await getAllGames();
    if(name){
        let searchGame = await totalGames.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
        searchGame.length ?
        res.status(200).send(searchGame):
        res.status(404).send("Juego no encontrado");
        }else{
            res.status(200).json(totalGames)
        }
});

module.exports = router;
