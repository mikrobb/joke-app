import React from "react";
import JokeCard from "./JokeCard";
import { useSelector, useDispatch } from "react-redux";
import JokeCardSearch from "./JokeCardSearch";
import FavoriteCard from "./FavoriteCard";

export default function HomePage() {
  const minLettees = 3;
  const randomJokeCheked = useSelector((state) => state.randomJokeCheked);
  const categoriesJokeCheked = useSelector(
    (state) => state.categoriesJokeCheked
  );
  const searchJokeCheked = useSelector((state) => state.searchJokeCheked);
  const category = useSelector((state) => state.category);
  const searchValue = useSelector((state) => state.searchValue);
  const dispatch = useDispatch();

  function getJoke() {
    if (
      randomJokeCheked === false &&
      categoriesJokeCheked === false &&
      searchJokeCheked === false
    )
      alert("Сhoose which joke you want to find");
    if (randomJokeCheked === true) {
      fetch("https://api.chucknorris.io/jokes/random")
        .then((data) => data.json())
        .then((json) => dispatch({ type: "getJoke", payload: json }));
    }
    if (categoriesJokeCheked === true && category) {
      fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then((data) => data.json())
        .then((json) => dispatch({ type: "getJoke", payload: json }));
    } else if(categoriesJokeCheked === true && !category){
      alert('Chose your category')
    }
    if (searchValue.length < minLettees && searchJokeCheked === true) {
      alert("Please enter more than 3 characters");
    } else if (searchJokeCheked === true && searchValue.length > minLettees) {
      fetch(`https://api.chucknorris.io/jokes/search?query=${searchValue}`)
        .then((data) => data.json())
        .then((json) =>
          dispatch({ type: "getJokeSearch", payload: json.result })
        );
    }
  }

  function getCategory(event) {
    dispatch({
      type: "getCategory",
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
                  dispatch({ type: "randomJokeCheked", payload: true })
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
                  dispatch({ type: "categoriesJokeCheked", payload: true })
                }
              />
              <label htmlFor="categories">From categories</label>
              <br />
            </div>
            {categoriesJokeCheked === true ? (
              <span style={{ marginLeft: "10px" }}>
                <input
                  onClick={getCategory}
                  className={
                    category.includes("animal")
                      ? "inpCategories inpCategoriesChecked"
                      : "inpCategories"
                  }
                  type="button"
                  value="ANIMAL"
                />
                <input
                  onClick={getCategory}
                  className={
                    category.includes("career")
                      ? "inpCategories inpCategoriesChecked"
                      : "inpCategories"
                  }
                  type="button"
                  value="CAREER"
                />
                <input
                  onClick={getCategory}
                  className={
                    category.includes("celebrity")
                      ? "inpCategories inpCategoriesChecked"
                      : "inpCategories"
                  }
                  type="button"
                  value="CELEBRITY"
                />
                <input
                  onClick={getCategory}
                  className={
                    category.includes("dev")
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
                  dispatch({ type: "searchJokeCheked", payload: true })
                }
              />
              <label htmlFor="search">Search</label>
              <br />
            </div>
            {searchJokeCheked === true ? (
              <input
                className="serchInp"
                type="text"
                placeholder="Free text search... (default: buisness)"
                onChange={(event) =>
                  dispatch({
                    type: "getSearchValue",
                    payload: event.target.value,
                  })
                }
              />
            ) : null}

            <button onClick={getJoke} type="button" className="btnJoke">
              Get a joke
            </button>
          </form>
          
          {randomJokeCheked === true || categoriesJokeCheked === true ? (
            <JokeCard />
          ) : (
            <JokeCardSearch />
          )}
        </div>
        <div className="favoriteBlock">
          <p style={{ color: "#ABABAB", fontSize: "20px" }}>Favourite</p>
          <FavoriteCard />
        </div>
      </div>
    </>
  );
}
