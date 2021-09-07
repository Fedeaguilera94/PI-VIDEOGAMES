import axios from "axios";

export function getVideoGames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames"); //conecto fyb
    return dispatch({
      type: "GET_CHARACTERS",
      payload: json.data, // default asc
    });
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
