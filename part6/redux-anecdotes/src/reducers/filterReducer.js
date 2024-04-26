const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const setFilter = (keywords) => {
  return {
    type: "SET_FILTER",
    payload: {
      filter: keywords,
    },
  };
};

export default filterReducer;
