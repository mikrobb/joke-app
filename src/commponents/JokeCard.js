import React from "react";
import JokeIconMessage from "../image-icons/JokeImage.png";
import link from "../image-icons/link.png";
import { useSelector, useDispatch } from "react-redux";

function setToLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}


export default function JokeCard() {
  const favJoke = useSelector((state) => state.favJokes);
  const getJoke = useSelector((state) => state.getJoke);
  const dispatch = useDispatch();

  function togle(id) {
    if (favJoke.includes(id)) {
      const newArray = favJoke.filter((item) => {
        return item !== id;
      });
      dispatch({ type: "getFavJoke", payload: newArray });
      setToLocalStorage("favJoke", newArray);
    } else {
      const newArray = [...favJoke];
      newArray.push(id);
      dispatch({ type: "getFavJoke", payload: newArray });
      setToLocalStorage("favJoke", newArray);
    }
  }

  if(!getJoke){
    return(
      <div></div>
    )
  }

  return (
    <>
    
      <div className="jokeMainBlock">
        {!favJoke.includes(getJoke) ? (
          <img
            className="favHearth"
            src="https://img.icons8.com/material-outlined/24/fa314a/like--v1.png"
            alt="favIcon"
            onClick={() => togle(getJoke)}
          />
        ) : (
          <img
            className="favHearth"
            src="https://img.icons8.com/ios-glyphs/30/fa314a/like--v1.png"
            alt="favIcon"
            onClick={() => togle(getJoke)}
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
              {getJoke.id}
            </span>
            <a href={getJoke.url}>
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
            {getJoke.value}
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
                Last update {getJoke.updated_at}
              </span>
            <div className="categoryBlock">{getJoke.categories}</div>
          </div>
        </div>
      </div>
    </>
  );
}
