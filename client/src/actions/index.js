import axios from "axios";

export function getVideoGames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames"); //conecto fyb
    return dispatch({
      type: "GET_CHARACTERS",
      payload: json.data,
    });
  };
}
