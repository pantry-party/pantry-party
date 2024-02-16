//content/display of the pantry
import { useGetPantryItemsbyHouseholdIdQuery } from "../storage/pantryPartyApi"
import { useContext, useState } from "react"
import { addIcon, alertIcon, sharingIcon, notSharingIcon } from "../styles/icons"
import AddItem from "./AddItem"
import EditItem from "./EditItem"
import { categoriesContext, userContext } from "../storage/context.jsx"

export default function PantryList() {
  const userInfo = useContext(userContext)
  const householdId = userInfo.sharedHouse || userInfo.defaultHouse
  const { data = {}, error, isLoading,} = useGetPantryItemsbyHouseholdIdQuery(householdId)
  const categories = useContext(categoriesContext)
  const [itemEdit, setItemEdit] = useState(false)
  const [editId, setEditId] = useState("")
  const [addForm, setAddForm] = useState(false)


  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Log in to open your pantry...{error.message}</div>
  }

  console.log(data)

  //edit items
  function itemEditor(itemId) {
    if (itemEdit == false) {
        setItemEdit(!itemEdit)
        setEditId(itemId)
    } else if (itemEdit == true && itemId == editId) {
        setItemEdit(!itemEdit)
    } else if (itemEdit == true) {
        setEditId(itemId)
    }
}

  //format dateMoved
  const dateType = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}

  function parseDate(timestamp) {
    const date = new Date(timestamp)

    return date.toLocaleDateString(undefined, dateType)
  }

return (<>
  {/* title, add new item button */}
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

  {/* edit item button */}
  <span className={item.color} >
    <button title="Edit Item Details" onClick={() => { itemEditor(item.id) }}>{categories.find((category) => item.category === category.name.toLowerCase()).icon}</button> 
  </span>

      {console.log(item)}

    <h2>{item.name} {item.isLow && <span className="blue"> {alertIcon}</span>} </h2>
    <p>{ parseDate(item.dateMoved) }</p>
      
  {/* display alerts */}
    {item.sharing && <div className="green"> {sharingIcon}</div>} 
    {item.sharing === false && <div className="red"> {notSharingIcon}</div>}

  {itemEdit && item.id === editId && <EditItem item={item} user={userInfo} />} 
      </div>
      ))}
  </div>
  </>
  )
}