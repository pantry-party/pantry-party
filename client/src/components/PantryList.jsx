//content/display of the pantry
import { useGetPantryItemsbyHouseholdIdQuery } from "../storage/pantryPartyApi"
import { useContext, useState } from "react"
import { addIcon, alertIcon, sharingIcon, notSharingIcon } from "../styles/icons"
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
    return <div>Log in to open your pantry...{error.message}</div>
  }

  console.log(data)

  //format dateMoved
  const dateType = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}

  function parseDate(timestamp) {
    const date = new Date(timestamp)

    return date.toLocaleDateString(undefined, dateType)
  }

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
      <h2>{item.name} {item.isLow && <span className="blue"> {alertIcon}</span>} </h2>
      <p>{ parseDate(item.dateMoved) }</p>

      {item.sharing && <div className="green"> {sharingIcon}</div>} 
      {item.sharing === false && <div className="red"> {notSharingIcon}</div>} 

       </div>
      ))}
  </div>
  </>
  )
}