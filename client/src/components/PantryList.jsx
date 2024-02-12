//content/display of the pantry
import { useGetPantryItemsbyHouseholdIdQuery } from "../storage/pantryPartyApi"
import { useContext, useState } from "react"
import { addIcon } from "../styles/icons"
import AddItem from "./AddItem"
import { categoriesContext } from "../storage/context.jsx"

export default function PantryList() {
  const { data = {}, error, isLoading,} = useGetPantryItemsbyHouseholdIdQuery(5)
  const [currentDate, setCurrentDate] = useState(getDate());
  const categories = useContext(categoriesContext)

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)

  // function for getting the date to display in the format we want
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${month}/${date}`;
  }

return ( <>
  {/* titles (dates for each week) and add new item to the pantry button */}
  <div>
      <h1>Week of {currentDate}</h1>
        <button title="Add New Item" onClick={AddItem}>{addIcon}</button>
    </div>

    <div>
      {data.map((item) => (
        <div key={item.id} >
          <h2>{item.name}</h2>  
       </div>
      ))}
    </div>

  {/* temporary icon display */}
    {categories.map((category) => {return <div> <p> {category.icon} </p> </div>}) } 
    </>
  )
}

//icon ideas:
// function getIcon(category) {

// }

// {categories.find((category) => {
//   return category.name == item.category
//   <p>{categoryObj.icon}</p>
// })}