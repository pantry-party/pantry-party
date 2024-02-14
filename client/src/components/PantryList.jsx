//content/display of the pantry
import { useGetPantryItemsbyHouseholdIdQuery } from "../storage/pantryPartyApi"
import { useContext, useState } from "react"
import { addIcon } from "../styles/icons"
import AddItem from "./AddItem"
import { categoriesContext, userContext } from "../storage/context.jsx"

export default function PantryList() {
  const userInfo = useContext(userContext)
  const householdId = userInfo.sharedHouse || userInfo.defaultHouse
  const { data = {}, error, isLoading,} = useGetPantryItemsbyHouseholdIdQuery(householdId)
  const categories = useContext(categoriesContext)
  const [addForm, setAddForm] = useState(false)


  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)

  //sort items by dateMoved
    // data.sort((a, b) => a.dateMoved-b.dateMoved)

return (<>
  {/* title and add new item to the pantry button */}
  <div>
    <h1>Your Pantry</h1>
    <button title="Add New Item" onClick={() => { setAddForm(!addForm) }}>{addIcon}</button>
  </div>

  {/* link to add form component */}
  <div>
    {addForm && <AddItem householdId={householdId} location="pantry" />}
  </div>

  {/* display items and icons */}
  <div>
    {data.map((item) => (
      <div key={item.id} className={item.category}>
      <p>{categories.find((category) => item.category === category.name.toLowerCase()).icon}</p>
      {console.log(item)} 
      <h2>{item.name}</h2>
      <p>{item.dateMoved}</p>
       </div>
      ))}
  </div>
  </>
  )
}

  // //display weekly date range
  // function getWeeks() {
  //   const start = new Date("2024-01-01")
  //   const end = new Date("2024-09-31")
    
  //   const DAY = 24 * 60 * 60 * 1000
  
  //     const weeks = []
  //     for (let newStart = start.valueOf(); newStart < end; newStart += DAY * 7) {
  //       const days = []
  //       for (let d = newStart; d < newStart + 7 * DAY; d += DAY) {
  //         days.push(new Date(d))
  //       }
  //       weeks.push(days)
  //     }
  //     console.log(weeks)
  
  //     return `${weeks}`
  //   }