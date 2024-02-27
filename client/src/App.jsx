import "./App.css"
import React, { useContext, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation.jsx"
import AccountDisplay from "./components/AccountDisplay"
import PantryList from "./components/PantryList"
import GroceryList from "./components/GroceryList"
import { householdContext } from "./storage/context.jsx"

function App() {
  const [household, setHousehold] = useState({})
  const [drag, setDrag] = useState(false)
  const [dragIt, setDragIt] = useState(-1)
   
  return (
    <>
      <Navigation drag={drag} dragIt={dragIt} setDrag={setDrag} />
      <div className="main">
          <householdContext.Provider value={household}>
            <Routes>
              <Route path="/" element={<AccountDisplay household={household} setHousehold={setHousehold} />} />
              <Route path="/pantry" element={<PantryList setDrag={setDrag} setDragIt={setDragIt} />} />
              <Route path="/groceryList" element={<GroceryList setDrag={setDrag} setDragIt={setDragIt} dragIt={dragIt} />} />
            </Routes>
          </householdContext.Provider>
      </div>
    </>
  )
}

export default App