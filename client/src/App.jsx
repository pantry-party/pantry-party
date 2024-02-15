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
  const item = {
    id: 12,
    name: "lemonade",
    dateMoved: "2024-01-08",
    inPantry: true, 
    sharing: false,
    isLow: false,
    category: "cans & bottles",
    expiry: null, 
    ownerId: 1,
    householdId: 5
  }
  const userTest = { name: 'Cara', username: 'cara1', id: 1, color: 'yellow', sharedHouse: null, defaultHouse: 1 }

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
              <Route path="/groceryList/edit" element={<EditItem />} />
              <Route path="/testing" element={<EditItem item={item} user={userTest} />} />
            </Routes>
          </householdContext.Provider>
        </userContext.Provider>
      </div>
    </>
  )
}

export default App
