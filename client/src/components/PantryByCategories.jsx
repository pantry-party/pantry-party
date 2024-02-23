import { useGetPantryItemsbyHouseholdIdQuery, useEditItemMutation } from "../storage/pantryPartyApi"
import { useContext, useState } from "react"
import { addIcon, alertIcon, sharingIcon, notSharingIcon } from "../styles/icons"
import AddItem from "./AddItem"
import EditItem from "./EditItem"
import { categoriesContext } from "../storage/context.jsx"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "../styles/pantry.css"

export default function PantryByCategories({ setDragIt, setDrag, dragIt }) {
    const user = useSelector((it) => it.state.user)
    const householdId = user.sharedHouse || user.defaultHouse
    const { data = {}, error, isLoading } = useGetPantryItemsbyHouseholdIdQuery(householdId)
    const [editItem, edited] = useEditItemMutation()
    const categories = useContext(categoriesContext)
    const [itemEdit, setItemEdit] = useState(false)
    const [editId, setEditId] = useState("")
    const [addForm, setAddForm] = useState(false)
    const [sort, setSort] = useState(false)
    const [dragCat, setDragCat] = useState("")
    const navigate = useNavigate()

    if (sort) {
        navigate("/pantry")
    }

    if (isLoading) {
        return <div>Loading...</div>
      }
      if (error) {
        return <div>Log in to open your pantry...{error.message}</div>
      }

    const items = []
    categories.forEach((category) => {
        let itemholder = {...category}
        itemholder.items = []
        data.forEach((item) => {
            if (item.category === category.name.toLowerCase()) {
                itemholder.items.push(item)
            }
        })
        items.push(itemholder)
    })

    function sortByPopulated () {
        let populated = []
        let empty = []
        let category = {}

        while (items.length) {
            category = items.shift()

            if (category.items.length) {
                populated.push(category)
            } else {
                empty.push(category)
            }
        }

        populated.forEach((obj) => items.push(obj))
        empty.forEach((obj) => items.push(obj))
    }
    sortByPopulated()

    function parseDate(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleDateString()
    }
    
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

    return (
        <div className="pantryPage">
            {/* title, add new item button */}
            <div className="pantryTop">
                <h1>Your Pantry</h1>
                <div className="pantryIntro">
                <p className="instructions"> Click on the category button to edit your item! </p>
                {!addForm 
                ? <button title="Add New Item" onClick={() => { setAddForm(!addForm) }} className="groceryButton" > {addIcon} </button>
                : <button title="Add New Item" onClick={() => { setAddForm(!addForm) }} className="groceryButton clicked" > {addIcon} </button>
                }
                <button title="Change Sorting" onClick={() => {setSort(true)}}>Sort by date added</button>
                </div>
            </div>
            {/* link to add form component */}
            {addForm && <div className="pantryAddForm"><AddItem householdId={householdId} location="pantry" /></div>}
            {/* display items and icons */}
            <div className="pantryItems">
                {items.map((category, index) => {
                    return (<div
                        key={index}
                        className="pantryWeek"
                        onDragOver={e => {e.preventDefault(); setDragCat(category.name.toLowerCase()); e.target.classList.add("dragover")}}
                        onDragLeave={(e) => {setDragCat(""); e.target.classList.remove("dragover")}}
                        onDrop={(e) => {editItem({id: dragIt, category: dragCat}); setDrag(false); e.target.classList.remove("dragover")}}
                    >
                        <h3 className="weekH3" >
                            {category.icon} &ensp;
                            {category.name}
                        </h3>
                        <ul className="pantryWeekItem">
                            {category.items.map((item) => {
                                return (<li
                                    key={item.id}
                                    className={` pantryItemDetail edit${itemEdit}`}  
                                    draggable={true}
                                    onDragStart={() => {setDragIt(item.id); setDrag(true);}}
                                    onDragEnd={() => {setDrag(false)}}
                                >
                                    {/* edit item button */}
                                    <span className="itemIcons">
                                        <button
                                            title="Edit Item Details"
                                            onClick={() => { itemEditor(item.id) }}
                                            className={`${item.color} pantryEditButton`}
                                        >
                                            {category.icon}    
                                        </button>
                                        {/* display alerts */}
                                        {item.sharing && <div className="alert sharing" title="EAT"> {sharingIcon}</div>}
                                        {item.sharing === false && <div className="alert nosharing" title="DO NOT eat"> {notSharingIcon}</div>}
                                    </span>
                                    <span className="itemName"><p><strong>{item.name} </strong></p>
                                        {item.isLow && <p className="alert isLow" title="Running Low!"> &nbsp; {alertIcon}</p>}
                                    </span>
                                    {item.expiry && <div className="expiryDate"> <p>Exp. {parseDate(item.expiry)}</p> </div>}
                                    {itemEdit && item.id === editId && <EditItem item={item} setItemEdit={setItemEdit} />}
                                </li>)
                            })}
                        </ul>
                    </div>)
                })}
            </div>
        </div>
    )
}