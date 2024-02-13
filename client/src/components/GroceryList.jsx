//content/display of grocery list
import { useState, useContext } from "react"
import { categoriesContext, userContext } from "../storage/context"
import { useGetGroceryItemsbyHouseholdIdQuery, useEditItemMutation, useDeleteItemMutation } from "../storage/pantryPartyApi"
import { editIcon, addIcon, goBackIcon, deleteIcon } from "../styles/icons"
import AddItem from "./AddItem"
import AddToCategory from "./GroceryListAdds"
import EditItem from "./EditItem"

export default function GroceryList() {
    const userInfo = useContext(userContext)
    const householdId = userInfo.sharedHouse || userInfo.defaultHouse
    const groceryPull = useGetGroceryItemsbyHouseholdIdQuery(householdId)
    const categories = useContext(categoriesContext)
    let orderedCategories = []
    const groceryList = groceryPull.data
    const [deleteItem, deletedItem] = useDeleteItemMutation()
    const [editItem, editedItem] = useEditItemMutation()
    const [editMode, setEditMode] = useState(false)

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

    return (<>
        {/* title, subtitle, and add to list and edit buttons*/}
        <div>
            <h1>Your Grocery List</h1>
            <h3>Check things off to add them to your pantry!</h3>
            {!editMode && <button title="Edit Items" onClick={() => { setEditMode(true) }}>{editIcon}</button>}
            {editMode && <button title="Close Editor" onClick={() => { setEditMode(false) }}>{goBackIcon}</button>}
            <button title="Add New Item" onClick={AddItem}>{addIcon}</button>
        </div>
        {/* alphabetically ordered categories -- add logic for populated cats first */}
        <div>
            {orderedCategories.map((category) => {
                return (
                    <>
                        <h3>
                            {categories.find((cat) => category === cat.name.toLowerCase()).icon} &ensp;
                            {categories.find((cat) => category === cat.name.toLowerCase()).name}
                        </h3>
                        {groceryList.map((item) => {
                            if (item.category == category) {
                                return (
                                    <li key={item.id}>
                                        {item.ownerId ? <>{item.userInitial}</> : <>&ensp;</>}
                                        {!editMode && <input
                                            type="checkbox"
                                            defaultChecked={item.inPantry}
                                            onChange={(e) => {
                                                editItem({ id: item.id, inPantry: true })
                                            }}
                                        />}
                                        {editMode && <button title="Edit Item Details" onClick={() => { <EditItem item={item} /> }} >{editIcon}</button>}
                                        {item.name}
                                        {editMode && <button title="Delete from List" onClick={(e) => {
                                            deleteItem({ id: item.id })
                                        }}>{deleteIcon}</button>}
                                    </li >
                                )
                            }
                        })}
                        {!editMode && <AddToCategory category={category} />}
                    </>
                )
            })}
        </div >
    </>
    )
}