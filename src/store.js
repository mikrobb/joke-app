import { createStore } from "redux";
import { RANDOM_RADIO_IS_CHEKED,
  CATEGORIES_RADIO_IS_CHEKED, 
  SEARCH_RADIO_IS_CHEKED , 
  GET_RANDOM_JOKE,
  GET_FAVORITE_JOKES,
  CATEGORY_TO_FIND,
  SEARCH_FIND_VALUE,
  GET_JOKES_FROM_SEARCH } from "./actions";

function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

const initialState = {
  randomRadioIsCheked: false,
  categoriesRadioIsCheked: false,
  selectedCategory: "",
  seacrhRadioIsCheked: false,
  searchFindValue: "",
  getRandomJoke: null,
  getJokesFromSearch: [],
  favoriteJokes: getFromLocalStorage("favJoke") || [],
  
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case RANDOM_RADIO_IS_CHEKED: {
      return {
        ...state,
        randomRadioIsCheked: action.payload,
        categoriesRadioIsCheked: false,
        seacrhRadioIsCheked: false,
      };
    }
    case CATEGORIES_RADIO_IS_CHEKED: {
      return {
        ...state,
        randomRadioIsCheked: false,
        categoriesRadioIsCheked: action.payload,
        seacrhRadioIsCheked: false,
      };
    }
    case CATEGORY_TO_FIND: {
      return { ...state, selectedCategory: action.payload };
    }
    case SEARCH_RADIO_IS_CHEKED: {
      return {
        ...state,
        randomRadioIsCheked: false,
        categoriesRadioIsCheked: false,
        seacrhRadioIsCheked: action.payload,
      };
    }
    case SEARCH_FIND_VALUE: {
      return { ...state, searchFindValue: action.payload };
    }
    case GET_RANDOM_JOKE: {
      return { ...state, getRandomJoke: action.payload };
    }
    case GET_JOKES_FROM_SEARCH: {
      return { ...state, getJokesFromSearch: action.payload };
    }
    case GET_FAVORITE_JOKES: {
      return { ...state, favoriteJokes: action.payload };
    }
    default: {
      return { ...state };
    }
  }
}

const store = createStore(reducer);
export default store;
