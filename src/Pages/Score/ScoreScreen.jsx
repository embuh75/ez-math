import { useNavigate } from "react-router-dom"
import CSS from "../Score/ScoreScreen.css"
import { useAuth } from "../../Components/context"
import { useLayoutEffect } from "react"

function ScoreScreen() {
    const navigate = useNavigate()
    const {name, globalScore, completedLevelName, globalHighScore} = useAuth()

    function backToCategoriesPage(){
        navigate("/Kategori")
    }

    function playAgain(){
        window.history.back()
    }

    useLayoutEffect(()=>{
        document.body.classList = []
        if (completedLevelName == "addition") {
            document.body.classList.add('red')
        }else if(completedLevelName == "subtraction"){
            document.body.classList.add("blue")
        }else if(completedLevelName == "division"){
            document.body.classList.add("green")
        }else if(completedLevelName == "multiplication"){
            document.body.classList.add("purple")
        }
    }, [])

  return (
    <main className="score-main">
      <p className="congrats cursive-bold">Selamat</p>

      <p className="done">
        Kerja Bagus <b className="username">{name}</b>, anda berhasil
        menyelesaikan kategori <b className="kategori">{completedLevelName}</b>
        !🚀
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

export default ScoreScreen