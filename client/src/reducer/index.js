const initialState = {
  videoGames: [],
  allGames: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CHARACTERS":
      return {
        ...state,
        videoGames: action.payload,
        allGames: action.payload,
      };
    //_____________________________________________
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
      return {};
    case "FILTER_CREATED":
      const allGames = state.allGames;
      const createdFilter =
        action.payload === "created"
          ? allGames.filter((g) => g.created)
          : allGames.filter((g) => !g.created);
      return {
        ...state,
        videoGames: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
