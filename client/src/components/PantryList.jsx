//content/display of the pantry
import { useGetPantryItemsbyHouseholdIdQuery } from "../storage/pantryPartyApi"
import { useContext, useState } from "react"
import { addIcon } from "../styles/icons"
import AddItem from "./AddItem"
import { categoriesContext } from "../storage/context.jsx"

export default function PantryList() {
  const { data = {}, error, isLoading,} = useGetPantryItemsbyHouseholdIdQuery(5)
  const [currentDate, setCurrentDate] = useState(getDate())
  const categories = useContext(categoriesContext)

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)

  //function for the date
  function getDate() {
    const today = new Date()
    const month = today.getMonth() + 1
    const date = today.getDate()
    return `${month}/${date}`
  }

return ( <>
  {/* title(weekly dates) and add new item to the pantry button */}
  <div>
      <h1>Week of {currentDate}</h1>
        <button title="Add New Item" onClick={AddItem}>{addIcon}</button>
    </div>

  {/* display items and icons */}
    <div>
    {data.map((item) => (
      <div key={item.id} className={item.category}>
      <h2>{item.name}</h2>
         <p> {categories.find((category) => item.category === category.name.toLowerCase()).icon} </p> 
       </div>
      ))}
    </div>
    </>
  )
}