//content/display of grocery list
import { useState, useContext } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { categoriesContext } from "../storage/context"
import { useGetGroceryItemsbyHouseholdIdQuery, useEditItemMutation, useDeleteItemMutation } from "../storage/pantryPartyApi"
import { editIcon, addIcon, goBackIcon, deleteIcon } from "../styles/icons"
import AddItem from "./AddItem"
import AddToCategory from "./GroceryListAdds"
import EditItem from "./EditItem"
import "../styles/grocery.css"
import "../styles/colors.css"
import "../styles/drag-drop.css"

export default function GroceryList({ setDrag, setDragIt, dragIt }) {
    const user = useSelector((it) => it.state.user)
    const householdId = user?.sharedHouse || user?.defaultHouse
    const groceryPull = useGetGroceryItemsbyHouseholdIdQuery(householdId)
    const categories = useContext(categoriesContext)
    const groceryList = groceryPull.data
    const [deleteItem, deletedItem] = useDeleteItemMutation()
    const [editItem, editedItem] = useEditItemMutation()
    const [editMode, setEditMode] = useState(false)
    const [itemEdit, setItemEdit] = useState(false)
    const [editId, setEditId] = useState("")
    const [addForm, setAddForm] = useState(false)
    const [dragCat, setDragCat] = useState("")
    const [check, setCheck] = useState(false)
    let orderedCategories = []

    // Redux states for token and user passing
    const token = useSelector((it) => it.state.token)

    if (groceryPull.isLoading) {
        return <div className="loggedout polkadot"><div className="login">Pulling out grocery list...</div></div>
    } if (groceryPull.error) {
        return <div className="loggedout polkadot"><div className="login">Your grocery list blew away...<Link to={"/"}> log in</Link> to catch it!</div></div>
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
        <div className="groceryTop polkadot">
            <h1>Your Grocery List</h1>
            <div className="groceryIntro">
                <p className="instructions">Check things off to add them to your pantry! Drag an item to change its category. </p>
                <span className="groceryButtonArea">
                    <label className="colorblind sort">
                        <input type="checkbox" default={false} onChange={() => { setCheck(!check); console.log(check) }}>
                        </input> Colorblind Mode </label>
                        <div className="spacer"> &nbsp; </div>
                    {!editMode
                        ? <button className="groceryButton" title="Edit Items" onClick={() => { setEditMode(true) }}>{editIcon}</button>
                        : <button className="groceryButton clicked" title="Close Editor" onClick={() => { setEditMode(false); setItemEdit(false) }}>{goBackIcon}</button>}
                    <div className="spacer"> &nbsp; </div>
                    {!addForm
                        ? <button title="Add New Item" className="groceryButton" onClick={() => { setAddForm(!addForm) }}>{addIcon}</button>
                        : <button title="Add New Item" className="groceryButton clicked" onClick={() => { setAddForm(!addForm) }}>{addIcon}</button>
                    }
                </span>
            </div>

            {/* link to add form component */}
            {addForm && <div className="groceryAddForm"> <AddItem householdId={householdId} location="groceryList" setAddForm={setAddForm} /> </div>}
        </div>
        {/* alphabetically ordered categories -- add logic for populated cats first */}
        <div className="groceryCategories">
            {orderedCategories.map((category, index) => {
                return (
                    <div
                        className="groceryCategory"
                        key={index}
                        onDragOver={e => { e.preventDefault(); setDragCat(category); e.target.classList.add("dragover") }}
                        onDragLeave={(e) => { setDragCat(""); e.target.classList.remove("dragover") }}
                        onDrop={(e) => { editItem({ id: dragIt, category: dragCat }); setDrag(false); e.target.classList.remove("dragover") }}
                    >
                        <h3>
                            {categories.find((cat) => category === cat.name.toLowerCase()).icon} &ensp;
                            {categories.find((cat) => category === cat.name.toLowerCase()).name}
                        </h3>
                        {groceryList.map((item) => {
                            if (item.category == category) {
                                return (
                                    <ul key={item.id} className="groceryItems">
                                        <li
                                            className="groceryDetails"
                                            draggable={true}
                                            onDragStart={() => { setDragIt(item.id); setDrag(true); }}
                                            onDragEnd={() => { setDrag(false) }}
                                        >
                                            {item.ownerId ? <span className={`${item.color} CB${check} initial`} title={`Belongs to ${item.ownerName}`} > {item.userInitial} </span> : <span className="initial">&nbsp; &nbsp;</span>}
                                            {!editMode && <input
                                                className="groceryCheck"
                                                type="checkbox"
                                                defaultChecked={item.inPantry}
                                                onChange={() => {
                                                    editItem({ id: item.id, inPantry: true, dateMoved: new Date() })
                                                }}
                                            />}
                                            {editMode && <button title="Edit Item Details" className="groceryButton edit" onClick={() => { itemEditor(item.id) }} >{editIcon}</button>}
                                            &nbsp; {item.name} &nbsp;
                                            {editMode && <button title="Delete from List" className="groceryButton delete" onClick={(e) => {
                                                deleteItem(item.id)
                                            }}>{deleteIcon}</button>}
                                        </li >
                                        <span className="groceryEdit">
                                            {itemEdit && item.id === editId && <EditItem item={item} setItemEdit={setItemEdit} />}
                                        </span>
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