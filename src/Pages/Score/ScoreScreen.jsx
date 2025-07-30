import { useNavigate } from "react-router-dom";
import CSS from "./ScoreScreen.css";
import { useAuth } from "../../Components/context";
import { useEffect, useLayoutEffect, useState } from "react";
import scoreAudio from "../../assets/my-sfx/yaaaaay.mp3";
import RandomMeme from "../../Components/RandomMeme/RandomMeme";
import Confetti from "react-confetti";

//Assets gif salah
import gifs1a from "../../assets/random-meme/gifsa/skill-issue-arknights.gif";
import gifs2a from "../../assets/random-meme/gifsa/shiroko-skill-issue.webp";
import gifs3a from "../../assets/random-meme/gifsa/doro-among-us-bailando.gif";
import gifs4a from "../../assets/random-meme/gifsa/STK-20250312-WA0005.webp";
import gifs5a from "../../assets/random-meme/gifsa/kodok-acumalaka.gif";

//Assets gif sbenar
import gifs1b from "../../assets/random-meme/gifsb/shikanoko-nokonoko-koshitantan-shikonoko.gif";
import gifs2b from "../../assets/random-meme/gifsb/hore-joget.gif";
import gifs3b from "../../assets/random-meme/gifsb/STK-20250312-WA0013.webp";
import gifs4b from "../../assets/random-meme/gifsb/STK-20250312-WA0026.webp";
import gifs5b from "../../assets/random-meme/gifsb/dancing-girl.gif";

function ScoreScreen() {
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { name, globalScore, completedLevelName, globalHighScore } = useAuth();

  function backToCategoriesPage() {
    navigate("/Kategori");
  }

  function playAgain() {
    window.history.back();
  }

  useLayoutEffect(() => {
    document.body.classList = [];
    if (completedLevelName == "Penjumlahan") {
      document.body.classList.add("red");
    } else if (completedLevelName == "Pengurangan") {
      document.body.classList.add("blue");
    } else if (completedLevelName == "Pembagian") {
      document.body.classList.add("green");
    } else if (completedLevelName == "Perkalian") {
      document.body.classList.add("purple");
    }
  }, []);

  function playAudioScore() {
    const audio = new Audio(scoreAudio); // pastikan ini tidak diakses sebelum deklarasi
    audio.play().catch((error) => {
      console.error("Gagal memutar audio:", error);
    });
  }

  useEffect(() => {
    playAudioScore();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gifLista = [
      { id: 1, url: gifs1a },
      { id: 2, url: gifs2a },
      { id: 3, url: gifs3a },
      { id: 4, url: gifs4a },
      { id: 5, url: gifs5a },
    ];
  
    const gifListb = [
      { id: 1, url: gifs1b },
      { id: 2, url: gifs2b },
      { id: 3, url: gifs3b },
      { id: 4, url: gifs4b },
      { id: 5, url: gifs5b },
    ];

  return (
    <main className="score-main">
      <Confetti width={dimensions.width} height={dimensions.height} />
      <p className="congrats cursive-bold">Selamat</p>
      <p className="done">
        Kerja Bagus <b className="username">{name}</b>, anda berhasil
        menyelesaikan kategori <b className="kategori">{completedLevelName}</b>!
        <RandomMeme gifs={gifListb} />
      </p>

      <div className="scores">
        <div className="current-score">
          <p>Skor</p>
          <p>{globalScore}</p>
        </div>

        <div className="high-score">
          <p>Skor Tertinggi</p>
          <p>{globalHighScore}</p>
        </div>
      </div>

      <div className="buttons">
        <button onClick={() => playAgain()}>Main Lagi!</button>

        <button onClick={() => backToCategoriesPage()}>Menu Utama</button>
      </div>
    </main>
  );
}

export default ScoreScreen;
