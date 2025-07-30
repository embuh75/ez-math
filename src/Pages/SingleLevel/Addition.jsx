import x from "../../assets/x.svg";
import AnswerCircle from "../../Components/AnswerCircle";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useAuth } from "../../Components/context";
import RandomMeme from "../../Components/RandomMeme/RandomMeme";
import { useRef } from "react";
import ding from "../../assets/my-sfx/anime-wow.mp3";
import wrong from "../../assets/my-sfx/error_XP.mp3";
import { FaHeart } from "react-icons/fa6";
import ConfettiExplosion from "react-confetti-explosion";

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

function Addition() {
  const [hp, setHp] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeButton, setActiveButton] = useState();
  const [sign, setSign] = useState();
  const [randomNumber, setRandomNumber] = useState(() =>
    Math.ceil(Math.random() * 20)
  );
  const [randomNumber2, setRandomNumber2] = useState(() =>
    Math.ceil(Math.random() * 10)
  );
  const [randomIndex, setRandomIndex] = useState(() =>
    Math.floor(Math.random() * 4)
  );
  const correctAnswer = randomNumber + randomNumber2;
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const answers = removeDuplicateNumbers(
    [
      correctAnswer + 3,
      correctAnswer * 2,
      correctAnswer + 5,
      correctAnswer - 1,
    ],
    4
  );
  answers[randomIndex] = correctAnswer;
  const { setGlobalScore, setCompletedLevelName, setGlobalHighScore } =
    useAuth();
  const floatingScoreRef = useRef();
  const overlayBenarRef = useRef();
  const audioCorrectRef = useRef();
  const audioWrongRef = useRef();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.body.classList = [];
    document.body.classList.add("red");
    setSign("+");
    setCompletedLevelName("Penjumlahan");
  }, []);

  function removeDuplicateNumbers(array, arrayLength) {
    let newArr = [...new Set(array)];
    if (arrayLength !== newArr.length) {
      newArr.push(65);
    }
    return newArr;
  }
  function playSoundEffect(soundEffectRef) {
    soundEffectRef.current.currentTime = 0;

    if (soundEffectRef == audioWrongRef) {
      soundEffectRef.current.play();
      setTimeout(() => {
        soundEffectRef.current.pause();
      }, 2000);
    } else {
      soundEffectRef.current.play();
    }
  }
  function leaveGameConfirmation() {
    const leaveGame = confirm(
      "Apakah anda yakin ingin meninggalkan permainan?"
    );
    leaveGame ? navigate("/Kategori") : "";
  }
  function handleButtonClick() {
    if (currentQuestion == 5) {
      if (activeButton == correctAnswer) {
        playSoundEffect(audioCorrectRef);
        setGlobalScore(score + 20);
        highScoreSetter(score + 20, "addition");
        navigate("/score");
      } else {
        playSoundEffect(audioWrongRef);
        setGlobalScore(score);
        highScoreSetter(score, "addition");
        floatingScoreRef.current.classList.add("visible");
        setHp((prev) => prev - 1);
      }
    } else {
      if (activeButton == correctAnswer) {
        playSoundEffect(audioCorrectRef);
        setScore((prev) => prev + 20);
        setShowConfetti(false); // reset dulu biar bisa remount
        setTimeout(() => {
          setShowConfetti(true); // trigger confetti
        }, 10);
        overlayBenarRef.current.classList.add("visible");
      } else if (activeButton !== correctAnswer) {
        playSoundEffect(audioWrongRef);
        floatingScoreRef.current.classList.add("visible");
        setHp((prev) => prev - 1);
      }
    }
  }
  function highScoreSetter(currentScore, category) {
    let prevHs = localStorage.getItem(`math-game-hs-${category}`);

    if (prevHs == null) {
      setGlobalHighScore(currentScore);
      localStorage.setItem(`math-game-hs-${category}`, currentScore);
    } else {
      if (currentScore >= prevHs) {
        localStorage.setItem(`math-game-hs-${category}`, currentScore);
        setGlobalHighScore(currentScore);
      } else {
        setGlobalHighScore(prevHs);
      }
    }
  }

  function nextGame() {
    if (currentQuestion == 5) {
      return navigate("/score");
    }

    setRandomNumber(Math.ceil(Math.random() * 20));
    setRandomNumber2(Math.ceil(Math.random() * 10));
    setActiveButton(null);
    setCurrentQuestion((prev) => prev + 1);
    setRandomIndex(Math.floor(Math.random() * 4));
  }
  const answerButtons = answers.map((answer, index) => {
    return (
      <AnswerCircle
        answer={answer}
        key={index}
        index={index}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />
    );
  });

  useEffect(() => {
    if (hp <= 0) {
      alert("Game Over! Kamu kehabisan nyawa.");
      setGlobalScore(score);
      highScoreSetter(score, "addition");
      navigate("/score");
    }
  }, [hp]);

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
    <main className="gameplay-main">
      <audio ref={audioCorrectRef} src={ding}></audio>

      <audio ref={audioWrongRef} src={wrong}></audio>

      <div className="x-container">
        <img
          src={x}
          onClick={() => leaveGameConfirmation()}
          alt="exit game"
          className="cancel"
        />
        {/* <div className="hp-container">
          {Array.from({ length: hp }).map((_, i) => (
            <FaHeart key={i} className="hp-icon"/>
          ))}
        </div> */}
      </div>

      <p className="progress">Pertanyaan {currentQuestion} dari 5</p>

      <p className="question">{randomNumber + sign + randomNumber2}=?</p>

      <div className="answers">{answerButtons}</div>

      <button
        onClick={() => handleButtonClick()}
        className={
          (activeButton != null) | (activeButton != undefined) ? "" : "disabled"
        }
      >
        Lanjut
      </button>

      <div ref={floatingScoreRef} className="overlay">
        <div className="score-showcase">
          <p>
            Jawaban anda salah! seharusnya:{" "}
            <b className="right-answer">{correctAnswer}</b>
          </p>
          <RandomMeme gifs={gifLista} />
          <button
            onClick={() => {
              floatingScoreRef.current.classList.remove("visible");
              nextGame();
            }}
          >
            Lanjut
          </button>
        </div>
      </div>

      <div ref={overlayBenarRef} className="overlay">
        <div className="score-showcase">
          {showConfetti && (
            <div
              style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
              }}
            >
              <ConfettiExplosion
                force={0.8}
                duration={2500}
                particleCount={200}
                width={window.innerWidth}
                height={window.innerHeight}
              />
            </div>
          )}
          <p>
            Selamat Jawaban Anda Benar!{" "}
            <p>
              Jawaban Anda: <b className="right-answer">{correctAnswer}</b>
            </p>
          </p>
          <RandomMeme gifs={gifListb} />
          <button
            onClick={() => {
              overlayBenarRef.current.classList.remove("visible");
              setShowConfetti(false);
              nextGame();
            }}
          >
            Lanjut
          </button>
        </div>
      </div>
    </main>
  );
}

export default Addition;
