//content/display of the pantry
import { useGetPantryItemsbyHouseholdIdQuery } from "../storage/pantryPartyApi"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { addIcon, alertIcon, sharingIcon, notSharingIcon, slashIcon, expiredIcon, userIcon } from "../styles/icons"
import AddItem from "./AddItem"
import EditItem from "./EditItem"
import { categoriesContext } from "../storage/context.jsx"
import { useSelector } from "react-redux"
import "../styles/pantry.css"
import { pantrySort } from "./PantrySort.jsx"

export default function PantryList({ setDragIt, setDrag }) {
  const user = useSelector((it) => it.state.user)
  const householdId = user?.sharedHouse || user?.defaultHouse
  const { data = {}, error, isLoading } = useGetPantryItemsbyHouseholdIdQuery(householdId)
  const categories = useContext(categoriesContext)
  const [itemEdit, setItemEdit] = useState(false)
  const [editId, setEditId] = useState("")
  const [addForm, setAddForm] = useState(false)
  const [edit, setEdit] = useState("")
  const token = useSelector((it) => it.state.token)
  const [sortStyle, setSortStyle] = useState("date")

  if (isLoading) {
    return <div className="loggedout polkadot"><div className="login">Loading...</div></div> 
  }
  if (error) {
    return <div className="loggedout polkadot"><div className="login"><Link to={"/"}>Log in</Link> to open your pantry...</div></div>
  }
  const sortedArr = pantrySort(data, sortStyle)

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

  function parseDate(timestamp) {
    const date = new Date(timestamp)
    return date.toLocaleDateString()
  }

  const today = new Date()
  const todayParse = parseDate(today)
  console.log(todayParse)



  return (
    <div className="pantryPage">
      {/* title, add new item button */}
      <div className="pantryTop polkadot">
        <h1>Your Pantry</h1>
        <div className="pantryIntro">
          <p className="instructions"> To edit, click the item icon! To delete, drag it to the menu.  </p>
          <div className="pantryButtons">
            <label className="sort">Sort by: &nbsp;
              <select
                title="Change Sorting"
                onChange={(e) => { setSortStyle(e.target.value) }}
                value={sortStyle}
              >
                <option value="date">Date Added</option>
                <option value="category">Category</option>
                {user.sharedHouse && <option value="owner">Ownership</option>}
              </select>
            </label>
            {!addForm
              ? <button title="Add New Item" onClick={() => { setAddForm(!addForm) }} className="groceryButton" > {addIcon} </button>
              : <button title="Add New Item" onClick={() => { setAddForm(!addForm) }} className="groceryButton clicked" > {addIcon} </button>
            }
          </div>
        </div>
        {/* link to add form component */}
        {addForm && <div className="pantryAddForm"><AddItem householdId={householdId} location="pantry" /></div>}
      </div>
      {/* display items and icons */}
      <div className="pantryItems">
        {sortedArr.map((section, index) => {
          if (section.items.length) {
            return (<div key={index} className="pantryWeek">
              <h3 className="weekH3">{section.name} &nbsp;
                {sortStyle === "category" && section.icon}
                {sortStyle === "ownership" && <span className={section.color}>{userIcon}</span>}
              </h3>
              <ul className="pantryWeekItems">
                {section.items.map((item) => (
                  <li
                    key={item.id}
                    className={` pantryItemDetail edit${itemEdit}`}
                    draggable={true}
                    onDragStart={() => { setDragIt(item.id); setDrag(true); }}
                    onDragEnd={() => { setDrag(false) }}
                  >
                    {/* edit item button */}
                    <span className="itemIcons">
                      {item.expiry && (parseDate(item.expiry) <= todayParse) &&
                        <button title="Edit Item Details" onClick={() => { itemEditor(item.id) }} className={`${item.color} pantryEditButton expired`}>
                          <i className={`${item.category}Icon`}> {categories.find((category) => item.category === category.name.toLowerCase()).icon} </i>
                          <i className="slashIcon"> {slashIcon} </i>
                        </button>}
                      {item.expiry && (parseDate(item.expiry) > todayParse) &&
                        <button title="Edit Item Details" onClick={() => { itemEditor(item.id) }} className={`${item.color} pantryEditButton`}>
                          <i className={`${item.category}Icon`}> {categories.find((category) => item.category === category.name.toLowerCase()).icon} </i>
                        </button>}
                      {!item.expiry &&
                        <button title="Edit Item Details" onClick={() => { itemEditor(item.id) }} className={`${item.color} pantryEditButton`}>
                          <i className={`${item.category}Icon`}> {categories.find((category) => item.category === category.name.toLowerCase()).icon} </i>
                        </button>}
                      {/* display alerts */}
                      {item.sharing && <div className="alert sharing" title="EAT"> {sharingIcon}</div>}
                      {item.sharing === false && <div className="alert nosharing" title="DO NOT eat"> {notSharingIcon}</div>}
                    </span>
                    <span className="itemName"><p><strong>{item.name} </strong></p>
                      {item.isLow && <p className="alert isLow" title="Running Low!"> &nbsp; {alertIcon}</p>}
                    </span>
                    {item.expiry && (parseDate(item.expiry) <= todayParse) && <div className="expiryDate expiredText"> <p>Exp. {parseDate(item.expiry)}</p> &nbsp; {expiredIcon} </div>}
                    {item.expiry && (parseDate(item.expiry) > todayParse) && <div className="expiryDate"> <p>Exp. {parseDate(item.expiry)}</p> </div>}
                    {itemEdit && item.id === editId && <EditItem item={item} setItemEdit={setItemEdit} />}
                  </li>
                ))}
              </ul>
            </div>)
          }
        })}
      </div>
    </div>
  )
}
