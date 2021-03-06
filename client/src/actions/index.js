import axios from "axios";

export function getVideoGames() {
  return async function (dispatch) {
    var json = await axios.get("/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getNameVideoGame(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/videogames?name=" + name);

      return dispatch({
        type: "GET_NAME_VIDEOGAME",
        payload: json.data,
      });
    } catch (error) {
      alert("Game Not Found");
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    var info = await axios.get("/genre", {});
    return dispatch({ type: "GET_GENRES", payload: info.data });
  };
}

export function postVideoGame(payload) {
  return async function (dispatch) {
    const response = await axios.post("/videogame", payload);
    console.log(response);
    return response;
  };
}

export function filterCreatedDB(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function filterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export function getDetail(id) {
  if (id) {
    return async function (dispatch) {
      try {
        let json = await axios.get("/videogame/" + id);

        return dispatch({
          type: "GET_DETAIL",
          payload: json.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
  return {
    type: "RESET",
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    const json = await axios.get(`/platforms`);
    return dispatch({ type: "GET_PLATFORMS", payload: json.data });
  };
}
