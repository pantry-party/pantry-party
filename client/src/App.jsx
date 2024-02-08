import "./App.css"
import React from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import AccountDisplay from "./components/AccountDisplay"
import PantryList from "./components/PantryList"
import GroceryList from "./components/GroceryList"
import GroceryEdit from "./components/GroceryEdit"
import { bottlesIcon, dairyIcon, dryIcon, freezerIcon, mealsIcon, otherIcon, produceIcon, proteinIcon } from "./styles/icons.jsx"


function App() {
  
  return (
    <>
    {bottlesIcon}
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<AccountDisplay />} />
          <Route path="/pantry" element={<PantryList />} />
          <Route path="/groceryList" element={<GroceryList />} />
          <Route path="/groceryList/edit" element={<GroceryEdit />} />
        </Routes>

      </div>
    </>
  )
}

export default App
