import "./App.css"
import React, { useContext, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation.jsx"
import AccountDisplay from "./components/AccountDisplay"
import PantryList from "./components/PantryList"
import GroceryList from "./components/GroceryList"
import EditItem from "./components/EditItem.jsx"
import { householdContext } from "./storage/context.jsx"


function App() {
  const [household, setHousehold] = useState({})
  
  return (
    <>
      <Navigation />
      <div>
          <householdContext.Provider value={household}>
            <Routes>
              <Route path="/" element={<AccountDisplay household={household} setHousehold={setHousehold} />} />
              <Route path="/pantry" element={<PantryList />} />
              <Route path="/groceryList" element={<GroceryList />} />
              <Route path="/groceryList/edit" element={<EditItem />} />
            </Routes>
          </householdContext.Provider>
      </div>
    </>
  )
}

export default App
