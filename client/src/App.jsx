import "./App.css"
import React from "react"
import { Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation.jsx"
import AccountDisplay from "./components/AccountDisplay"
import PantryList from "./components/PantryList"
import GroceryList from "./components/GroceryList"
import EditItem from "./components/EditItem.jsx"
import { bottlesIcon, dairyIcon, dryIcon, freezerIcon, mealsIcon, otherIcon, produceIcon, proteinIcon } from "./styles/icons.jsx"


function App() {
  
  return (
    <>
    <Navigation />
      <div>
        <Routes>
          <Route path="/" element={<AccountDisplay />} />
          <Route path="/pantry" element={<PantryList />} />
          <Route path="/groceryList" element={<GroceryList />} />
          {/* might use a different Route for the edit ????, deleted old GroceryEdits file */}
          <Route path="/groceryList/edit" element={<EditItem />} />
        </Routes>

      </div>
    </>
  )
}

export default App
