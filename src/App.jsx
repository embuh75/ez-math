import { Route, Routes } from "react-router-dom"
import MyContextProvider from "./Components/context"

import Category from "./Pages/Category/Category"
import Home from "./Pages/Home"
import ScoreScreen from "./Pages/Score/ScoreScreen"

import { useState } from "react"
import { useEffect } from "react"
import Addition from "./Pages/SingleLevel/Addition"
import Subtraction from "./Pages/SingleLevel/Subtraction"
import Division from "./Pages/SingleLevel/Division"
import Multiplication from "./Pages/SingleLevel/Multiplication"
import Penjumlahan from "./Pages/SingleLevel/Addition"

function App() {
  const [nameInLocalStorage, setNameInLocalStorage] = useState("")

  useEffect(()=>{
    if (localStorage.getItem("math-game-react")) {
      setNameInLocalStorage(localStorage.getItem("math-game-react"))
    }
  }, [])

  return (
    <MyContextProvider>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Kategori" element={<Category />} />
          <Route path="/Kategori/Penjumlahan" element={<Penjumlahan />} />
          <Route path="/Kategori/Pengurangan" element={<Subtraction />} />
          <Route path="/Kategori/Pembagian" element={<Division />} />
          <Route path="/Kategori/Perkalian" element={<Multiplication />} />
          <Route path="/Score" element={<ScoreScreen />} />
        </Routes>
      </>
    </MyContextProvider>
  );
}

export default App
