import "./App.css"
import React from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login.jsx"
import Register from "./components/register"
import AccountDisplay from "./components/accountDisplay"
import PantryList from "./components/pantryList"
import GroceryList from "./components/groceryList"
import GroceryEdit from "./components/groceryEdit"
import { bottlesIcon, dairyIcon, dryIcon, freezerIcon, mealsIcon, otherIcon, produceIcon, proteinIcon } from "./styles/icons.jsx"


function App() {
  
  return (
    <>
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
