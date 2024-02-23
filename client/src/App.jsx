import "./App.css"
import React, { useContext, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation.jsx"
import AccountDisplay from "./components/AccountDisplay"
import PantryList from "./components/PantryList"
import GroceryList from "./components/GroceryList"
import EditItem from "./components/EditItem.jsx"
import { householdContext } from "./storage/context.jsx"
import PantryByCategories from "./components/PantryByCategories.jsx"


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
              <Route path="/pantry/categories" element={<PantryByCategories setDrag={setDrag} setDragIt={setDragIt} dragIt={dragIt} />} />
              <Route path="/groceryList" element={<GroceryList setDrag={setDrag} setDragIt={setDragIt} dragIt={dragIt} />} />
              <Route path="/groceryList/edit" element={<EditItem />} />
            </Routes>
          </householdContext.Provider>
      </div>
    </>
  )
}

export default App
