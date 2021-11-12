import React from "react";
import JokeIconMessage from "../image-icons/JokeImage.png";
import link from "../image-icons/link.png";
import { useSelector, useDispatch } from "react-redux";
import { GET_FAVORITE_JOKES } from "../actions";


function setToLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}


export default function JokeCard() {
  const favoriteJokes = useSelector((state) => state.favoriteJokes);
  const getRandomJoke = useSelector((state) => state.getRandomJoke);
  const dispatch = useDispatch();

  function addOrRemoveFromFavorite(joke) {
    if (favoriteJokes.includes(joke)) {
      const newArray = favoriteJokes.filter((item) => {
        return item !== joke;
      });
      dispatch({ type: GET_FAVORITE_JOKES, payload: newArray });
      setToLocalStorage("favJoke", newArray);
    } else {
      const newArray = [...favoriteJokes];
      newArray.push(joke);
      dispatch({ type: GET_FAVORITE_JOKES, payload: newArray });
      setToLocalStorage("favJoke", newArray);
    }
  }

  if(!getRandomJoke){
    return(
      <div style={{fontWeight:'bold', fontSize:'30px'}}>No joke found</div>
    )
  }

  return (
    <>
    
      <div className="jokeMainBlock">
        {!favoriteJokes.find((joke)=>joke.id === getRandomJoke.id) ? (
          <img
            className="favHearth"
            src="https://img.icons8.com/material-outlined/24/fa314a/like--v1.png"
            alt="favIcon"
            onClick={() => addOrRemoveFromFavorite(getRandomJoke)}
          />
        ) : (
          <img
            className="favHearth"
            src="https://img.icons8.com/ios-glyphs/30/fa314a/like--v1.png"
            alt="favIcon"
            onClick={() => addOrRemoveFromFavorite(getRandomJoke)}
          />
        )}
        <div style={{ marginRight: "20px" }}>
          <img
            style={{ width: "40px", height: "40px" }}
            src={JokeIconMessage}
            alt="iconMessage"
          />
        </div>
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: "10px", marginBottom: "5px" }}>
            ID:
            <span style={{ color: "blue", marginRight: "5px" }}>
              {getRandomJoke.id}
            </span>
            <a href={getRandomJoke.url}>
              <img src={link} alt="" />
            </a>
          </p>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "26px",
              marginBottom: "28px",
            }}
          >
            {getRandomJoke.value}
          </p>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#ABABAB", fontSize: "10px" }}>
                Last update {getRandomJoke.updated_at}
              </span>
            <div className="categoryBlock">{getRandomJoke.categories}</div>
          </div>
        </div>
      </div>
    </>
  );
}
