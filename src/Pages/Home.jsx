import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/context";

function Home() {
  const { name, setNameFunction } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const validatorRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (localStorage.getItem("math-game-react")) {
      setInputValue(localStorage.getItem("math-game-react"));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (inputValue.trim()) {
      setNameFunction(inputValue);
      localStorage.setItem("math-game-react", inputRef.current.value);
      navigate("/Kategori");
    } else {
      validatorRef.current.classList.remove("hidden");
      setTimeout(() => {
        validatorRef.current.classList.add("hidden");
      }, 3000);
    }
  }

  return (
    <div className="home-overlay">
      <div className="popup">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h2 className="cursive-bold">Masukan Nama Anda</h2>

          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => {
              validatorRef.current.classList.add("hidden");
              setInputValue(e.target.value);
            }}
            type="text"
            placeholder="Masukan nama anda disini!"
          />

          <p ref={validatorRef} className="validator hidden">
            Tolong isi nama anda untuk melanjutkan 😁
          </p>

          <button className="animated-button cursive-bold" type="submit">Mulai Bermain</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
