import { useState, useEffect } from "react";
import "./RandomMeme.css"

const RandomMeme = ({gifs}) => {
  
  const randomIndex = Math.floor(Math.random() * gifs.length);
  const gif = gifs[randomIndex];

  return (
    <div>
      {gif && (
        <div className="meme-container">
          <img src={gif.url} alt={gif.id} className="meme-img" />
        </div>
      )}
    </div>
  );
};

export default RandomMeme;
