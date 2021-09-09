const initialState = {
  videoGames: [],
  allVideoGames: [],
  genres: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videoGames: action.payload,
        allVideoGames: action.payload,
      };
    //_____________________________________________
    case "GET_NAME_VIDEOGAME":
      return {
        ...state,
        videoGames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "ORDER_BY_NAME":
      let sortArray =
        action.payload === "asc"
          ? state.videoGames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0; // si son iguales lo deja igual
            })
          : state.videoGames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videoGames: sortArray,
      };
    //_________________________________________
    case "ORDER_BY_RATING":
      let sort =
        action.payload === "low"
          ? state.videoGames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0; // si son iguales lo deja igual
            })
          : state.videoGames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videoGames: sort,
      };

    //___________________________________________
    case "FILTER_BY_GENRE":
      const filtrado =
        action.payload === "all"
          ? state.allVideoGames
          : state.allVideoGames.filter((g) => {
              return g.genres.find((g) => {
                return g.name === action.payload;
              });
            });
      return {
        ...state,
        videoGames: filtrado,
      };

    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "created"
          ? //? state.allVideoGames.filter((g) => g.created)
            //: state.allVideoGames.filter((g) => !g.created);
            state.allVideoGames.filter((g) => g.id.length > 10)
          : state.allVideoGames.filter((g) => g.id.toString().length < 6);
      return {
        ...state,
        videoGames:
          action.payload === "all" ? state.allVideoGames : createdFilter,
      };
    case "POST_VIDEOGAME": // no hace nada
      return {
        ...state,
      };
    case "GET_DETAIL":
      //console.log("info DETAIL", action.payload);
      return {
        ...state,
        detail: action.payload,
      };

    default:
      //console.log("DEFAULT CASE", action.type);
      return state;
  }
}

export default rootReducer;
