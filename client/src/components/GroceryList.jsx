//content/display of grocery list
import { useState, useContext } from "react"
import { useSelector } from "react-redux"
import { categoriesContext, userContext } from "../storage/context"
import { useGetGroceryItemsbyHouseholdIdQuery, useEditItemMutation, useDeleteItemMutation } from "../storage/pantryPartyApi"
import { editIcon, addIcon, goBackIcon, deleteIcon } from "../styles/icons"
import AddItem from "./AddItem"
import AddToCategory from "./GroceryListAdds"
import EditItem from "./EditItem"
import "../styles/grocery.css"

export default function GroceryList() {
    const userInfo = useContext(userContext)
    const householdId = userInfo.sharedHouse || userInfo.defaultHouse
    const groceryPull = useGetGroceryItemsbyHouseholdIdQuery(householdId)
    const categories = useContext(categoriesContext)
    const groceryList = groceryPull.data
    const [deleteItem, deletedItem] = useDeleteItemMutation()
    const [editItem, editedItem] = useEditItemMutation()
    const [editMode, setEditMode] = useState(false)
    const [itemEdit, setItemEdit] = useState(false)
    const [editId, setEditId] = useState("")
    const [addForm, setAddForm] = useState(false)
    let orderedCategories = []

    // Redux states for token and user passing
    const token = useSelector((it) => it.state.token)
    const user = useSelector((it) => it.state.user)

    if (groceryPull.isLoading) {
        return <div>Pulling out grocery list...</div>
    } if (groceryPull.error) {
        return <div>Your grocery list blew away...</div>
    }

    function categoryOrder() {
        let has = []
        let empty = []
        categories.forEach((cat) => { empty.push(cat.name.toLowerCase()) })

        groceryList.forEach((item) => {
            if (empty.includes(item.category) && has.length < 8) {
                let i = empty.indexOf(item.category)
                if (!has.includes(item.category)) {
                    has.push(empty[i])
                    empty.splice(i, 1)
                }
            }
        })
        orderedCategories = has.concat(empty)
    }
    categoryOrder()

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

    return (<div className="groceryListPage">
        {/* title, subtitle, and add to list and edit buttons*/}
        <div>
            <h1>Your Grocery List</h1>
            <div className="groceryIntro">
                <h3>Check things off to add them to your pantry!</h3>
                {!editMode
                    ? <button className="groceryButton" title="Edit Items" onClick={() => { setEditMode(true) }}>{editIcon}</button>
                    : <button className="groceryButton" title="Close Editor" onClick={() => { setEditMode(false); setItemEdit(false) }}>{goBackIcon}</button>}
                <button title="Add New Item" className="groceryButton" onClick={() => { setAddForm(!addForm) }}>{addIcon}</button>
            </div>
        </div>
        {/* link to add form component */}
        {addForm && <AddItem householdId={householdId} location="groceryList" setAddForm={setAddForm} />}
        {/* alphabetically ordered categories -- add logic for populated cats first */}
        <div className="groceryCategories">
            {orderedCategories.map((category) => {
                return (
                    <div className="groceryCategory">
                        <h3>
                            {categories.find((cat) => category === cat.name.toLowerCase()).icon} &ensp;
                            {categories.find((cat) => category === cat.name.toLowerCase()).name}
                        </h3>
                        {groceryList.map((item) => {
                            if (item.category == category) {
                                return (
                                    <ul className="groceryItems">
                                        <li key={item.id} className="groceryDetails">
                                            {item.ownerId ? <span className={item.color} > {item.userInitial} </span> : <span>&ensp; &nbsp;</span>}
                                            {!editMode && <input
                                                type="checkbox"
                                                defaultChecked={item.inPantry}
                                                onChange={(e) => {
                                                    editItem({ id: item.id, inPantry: true })
                                                }}
                                            />}
                                            {editMode && <button title="Edit Item Details" className="groceryButton" onClick={() => { itemEditor(item.id) }} >{editIcon}</button>}
                                            &nbsp; {item.name} &nbsp;
                                            {editMode && <button title="Delete from List" className="groceryButton" onClick={(e) => {
                                                deleteItem(item.id)
                                            }}>{deleteIcon}</button>}
                                        </li >
                                        {itemEdit && item.id === editId && <EditItem item={item} user={userInfo} />}
                                    </ul>
                                )
                            }
                        })}
                        {!editMode && <AddToCategory category={category} />}
                    </div>
                )
            })}
        </div >
    </div>
    )
}