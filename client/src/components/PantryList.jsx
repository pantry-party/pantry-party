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

export default function PantryList({ setDragIt, setDrag }) {
  const user = useSelector((it) => it.state.user)
  const householdId = user.sharedHouse || user.defaultHouse
  const { data = {}, error, isLoading } = useGetPantryItemsbyHouseholdIdQuery(householdId)
  const categories = useContext(categoriesContext)
  const [itemEdit, setItemEdit] = useState(false)
  const [editId, setEditId] = useState("")
  const [addForm, setAddForm] = useState(false)
  const [edit, setEdit] = useState("")
  const token = useSelector((it) => it.state.token)
  const [sortStyle, setSortStyle] = useState("date")

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div><Link to={"/"}>Log in</Link> to open your pantry...</div>
  }

  function createWeeks() {
    //print out all mondays from 1 year ago to today
    let dateSet = []
    let day
    let weekStart
    let weekEnd
    for (let i = 0; i < 366; i++) {
      day = new Date()
      day.setDate(day.getDate() - 365)
      day.setHours(0, 0, 0, 0)
      day.setDate(day.getDate() + i)
      if (day.getDay() === 1) {
        weekStart = day
      } else if (i === 365 || day.getDay() === 0 && weekStart) {
        weekEnd = day
      }

      if (day.getDay() === 1 && i === 365) {
        weekEnd = day
      }

      if (weekStart && weekEnd) {
        let week = { weekStart, weekEnd, items: [] }
        dateSet.push(week)
        weekStart = null
        weekEnd = null
      }
    }

    data.forEach((item) => {
      let moved = new Date(item.dateMoved)
      moved.setHours(0, 0, 0, 0)
      dateSet.forEach((week) => {
        if (week.weekStart <= moved && moved <= week.weekEnd) {
          week.items.push(item)
        }
      })
    })

    return dateSet
  }


  const weeksArr = createWeeks()
  // console.log(weeksArr[weeksArr.length - 1])

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
          {!addForm
            ? <button title="Add New Item" onClick={() => { setAddForm(!addForm) }} className="groceryButton" > {addIcon} </button>
            : <button title="Add New Item" onClick={() => { setAddForm(!addForm) }} className="groceryButton clicked" > {addIcon} </button>
          }
        </div>


        {/* link to add form component */}
        {addForm && <div className="pantryAddForm"><AddItem householdId={householdId} location="pantry" /></div>}
      </div>
      {/* display items and icons */}
      <div className="pantryItems">
        {weeksArr.map((week) => {
          if (week.items.length) {
            return (<div key={week.weekStart} className="pantryWeek">
              <h3 className="weekH3">Week of {week.weekStart.toLocaleDateString()} </h3>
              <ul className="pantryWeekItems">
                {week.items.map((item) => (
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
