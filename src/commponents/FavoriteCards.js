import React from "react";
import JokeIconMessage from "../image-icons/JokeImage.png";
import link from "../image-icons/link.png";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import { GET_FAVORITE_JOKES} from "../actions";

function setToLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}


export default function FavoriteCard() {
  const favoriteJokes = useSelector((state) => state.favoriteJokes);
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
  return (
    <>
      {favoriteJokes.map((joke) => (
        <Fragment key={joke.id}>
        <div className="favMainBlock">
          {!favoriteJokes.find((joke)=>joke.id === joke.id) ? (
            <img
              className="favHearthFav"
              src="https://img.icons8.com/material-outlined/24/fa314a/like--v1.png"
              alt="favIcon"
              onClick={() => addOrRemoveFromFavorite(joke)}
            />
          ) : (
            <img
              className="favHearthFav"
              src="https://img.icons8.com/ios-glyphs/30/fa314a/like--v1.png"
              alt="favIcon"
              onClick={() => addOrRemoveFromFavorite(joke)}
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
                {joke.id}
              </span>
              <a href={joke.url}>
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
              {joke.value}
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
                Last update {joke.updated_at}
              </span>
              <div className="categoryBlockFav">{joke.categories}</div>
            </div>
          </div>
        </div>
        </Fragment>
      ))}
    </>
  );
}
