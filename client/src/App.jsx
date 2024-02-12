import "./App.css"
import React, { useContext, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation.jsx"
import AccountDisplay from "./components/AccountDisplay"
import PantryList from "./components/PantryList"
import GroceryList from "./components/GroceryList"
import EditItem from "./components/EditItem.jsx"
import { bottlesIcon, dairyIcon, dryIcon, freezerIcon, mealsIcon, otherIcon, produceIcon, proteinIcon } from "./styles/icons.jsx"
import { userContext, householdContext } from "./storage/context.jsx"


function App() {
  const [userInfo, setUserInfo] = useState({})
  const [household, setHousehold] = useState({})

  return (
    <>
      <Navigation />
      <div>
        <userContext.Provider value={userInfo}>
          <householdContext.Provider value={household}>
            <Routes>
              <Route path="/" element={<AccountDisplay userInfo={userInfo} setUserInfo={setUserInfo} household={household} setHousehold={setHousehold}/>} />
              <Route path="/pantry" element={<PantryList />} />
              <Route path="/groceryList" element={<GroceryList />} />
              <Route path="/groceryList/edit" element={<GroceryEdit />} />
            </Routes>
          </householdContext.Provider>
        </userContext.Provider>
      </div>
    </>
  )
}

export default App
