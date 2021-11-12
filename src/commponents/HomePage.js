import React from "react";
import JokeCard from "./JokeCard";
import { useSelector, useDispatch } from "react-redux";
import JokeCardsFromSearch from "./JokeCardsFromSearch";
import FavoriteCards from "./FavoriteCards";
import { RANDOM_RADIO_IS_CHEKED,
  CATEGORIES_RADIO_IS_CHEKED, 
  SEARCH_RADIO_IS_CHEKED , 
  GET_RANDOM_JOKE,
  CATEGORY_TO_FIND,
  SEARCH_FIND_VALUE,
  GET_JOKES_FROM_SEARCH } from "../actions";

export default function HomePage() {
  const minLettersToFind = 3;

  const randomRadioIsCheked = useSelector((state) => state.randomRadioIsCheked);
  const categoriesRadioIsCheked = useSelector((state) => state.categoriesRadioIsCheked);
  const seacrhRadioIsCheked = useSelector((state) => state.seacrhRadioIsCheked);

  const selectedCategory = useSelector((state) => state.selectedCategory);
  const searchFindValue = useSelector((state) => state.searchFindValue);
  
  const favoriteJokes = useSelector((state)=> state.favoriteJokes)
  const dispatch = useDispatch();


  function getJoke() {
    if (
      randomRadioIsCheked === false &&
      categoriesRadioIsCheked === false &&
      seacrhRadioIsCheked === false
    )
      alert("Сhoose which joke you want to find");


    if (randomRadioIsCheked === true) {
      fetch("https://api.chucknorris.io/jokes/random")
        .then((data) => data.json())
        .then((json) => dispatch({ type: GET_RANDOM_JOKE, payload: json }));
    }


    if (categoriesRadioIsCheked === true && selectedCategory) {
      fetch(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`)
        .then((data) => data.json())
        .then((json) => dispatch({ type: GET_RANDOM_JOKE, payload: json }));
    } else if(categoriesRadioIsCheked === true && !selectedCategory){
      alert('Chose your category')
    }


    if (searchFindValue.length < minLettersToFind && seacrhRadioIsCheked === true) {
      alert("Please enter more than 3 characters");
    } else if (seacrhRadioIsCheked === true && searchFindValue.length > minLettersToFind) {
      fetch(`https://api.chucknorris.io/jokes/search?query=${searchFindValue}`)
        .then((data) => data.json())
        .then((json) =>
          dispatch({ type: GET_JOKES_FROM_SEARCH, payload: json.result })
        );
    }

    dispatch({
      type: SEARCH_FIND_VALUE,
      payload: '',
    })
  }


  function getCategory(event) {
    dispatch({
      type: CATEGORY_TO_FIND,
      payload: event.target.value.toLowerCase(),
    });
  }


  return (
    <>
    <div >
    <img className='scrollToTop'  src="https://img.icons8.com/dotty/80/000000/left-up2.png" alt='scrollToTop' onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })}/>
    </div>
      <div className="mainBlock">
        <div className="jokePageBlock">
          <h3 style={{ fontSize: "20px", marginBottom: "78px" }}>
            Exam-App 2021
          </h3>
          <h1 style={{ fontSize: "32px" }}>Hey!</h1>
          <h3 style={{ fontSize: "24px", marginBottom: "43px" }}>
            Let’s try to find a joke for you:
          </h3>
          <form>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                style={{ marginRight: "15px" }}
                type="radio"
                name="choise"
                id="random"
                onChange={() =>
                  dispatch({ type: RANDOM_RADIO_IS_CHEKED, payload: true })
                }
              />
              <label htmlFor="random">Random</label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                style={{ marginRight: "15px" }}
                type="radio"
                name="choise"
                id="categories"
                onChange={() =>
                  dispatch({ type: CATEGORIES_RADIO_IS_CHEKED, payload: true })
                }
              />
              <label htmlFor="categories">From categories</label>
              <br />
            </div>
            {categoriesRadioIsCheked === true ? (
              <span style={{ marginLeft: "10px" }}>
                <input
                  onClick={getCategory}
                  className={
                    selectedCategory.includes("animal")
                      ? "inpCategories inpCategoriesChecked"
                      : "inpCategories"
                  }
                  type="button"
                  value="ANIMAL"
                />
                <input
                  onClick={getCategory}
                  className={
                    selectedCategory.includes("career")
                      ? "inpCategories inpCategoriesChecked"
                      : "inpCategories"
                  }
                  type="button"
                  value="CAREER"
                />
                <input
                  onClick={getCategory}
                  className={
                    selectedCategory.includes("celebrity")
                      ? "inpCategories inpCategoriesChecked"
                      : "inpCategories"
                  }
                  type="button"
                  value="CELEBRITY"
                />
                <input
                  onClick={getCategory}
                  className={
                    selectedCategory.includes("dev")
                      ? "inpCategories inpCategoriesChecked"
                      : "inpCategories"
                  }
                  type="button"
                  value="DEV"
                />
              </span>
            ) : null}
            <div style={{ display: "flex", alignItems: true }}>
              <input
                style={{ marginRight: "15px" }}
                type="radio"
                name="choise"
                id="search"
                onChange={() =>
                  dispatch({ type: SEARCH_RADIO_IS_CHEKED, payload: true })
                }
              />
              <label htmlFor="search">Search</label>
              <br />
            </div>
            {seacrhRadioIsCheked === true ? (
              <input
                className="serchInp"
                type="text"
                placeholder="Free text search... (example: World)"
                onChange={(event) =>
                  dispatch({
                    type: SEARCH_FIND_VALUE,
                    payload: event.target.value,
                  })
                }
                value={searchFindValue}
              />
            ) : null}

            <button onClick={getJoke} type="button" className="btnJoke">
              Get a joke
            </button>
          </form>
          
          {randomRadioIsCheked === true || categoriesRadioIsCheked === true ? (
            <JokeCard />
          ) : (
            <JokeCardsFromSearch />
          )}
        </div>
        <div className="favoriteBlock">
          <p style={{ color: "#ABABAB", fontSize: "20px" }}>Favourite</p>
        
        {favoriteJokes.length === 0 ? <div className='empty'>Empty</div> : <FavoriteCards />}
        </div>
      </div>
    </>
  );
}
