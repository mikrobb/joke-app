import { createStore } from "redux";

function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

const initialState = {
  randomJokeCheked: false,
  categoriesJokeCheked: false,
  category: "",
  searchJokeCheked: false,
  getJoke: null,
  getJokeSearch: [],
  favJokes: getFromLocalStorage("favJoke") || [],
  searchValue: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "randomJokeCheked": {
      return {
        ...state,
        randomJokeCheked: action.payload,
        categoriesJokeCheked: false,
        searchJokeCheked: false,
      };
    }
    case "categoriesJokeCheked": {
      return {
        ...state,
        randomJokeCheked: false,
        categoriesJokeCheked: action.payload,
        searchJokeCheked: false,
      };
    }
    case "searchJokeCheked": {
      return {
        ...state,
        randomJokeCheked: false,
        categoriesJokeCheked: false,
        searchJokeCheked: action.payload,
      };
    }
    case "getJoke": {
      return { ...state, getJoke: action.payload };
    }
    case "getFavJoke": {
      return { ...state, favJokes: action.payload };
    }
    case "getCategory": {
      return { ...state, category: action.payload };
    }
    case "getSearchValue": {
      return { ...state, searchValue: action.payload };
    }
    case "getJokeSearch": {
      return { ...state, getJokeSearch: action.payload };
    }
    default: {
      return { ...state };
    }
  }
}

const store = createStore(reducer);
export default store;
