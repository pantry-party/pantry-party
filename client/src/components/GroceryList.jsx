//content/display of grocery list
import { useState, useContext } from "react"
import { categoriesContext } from "../storage/context"
import { useGetGroceryItemsbyHouseholdIdQuery } from "../storage/pantryPartyApi"
import { editIcon, addIcon } from "../styles/icons"
import { handleCheck } from "./GroceryFunctions"
import GroceryEdit from "./GroceryEdit"
import AddItem from "./AddItem"
import AddToCategory from "./GroceryListAdds"

export default function GroceryList() {
    const groceryPull = useGetGroceryItemsbyHouseholdIdQuery(5)
    const categories = useContext(categoriesContext)
    const groceryList = groceryPull.data

    if (groceryPull.isLoading) {
        return <div>Pulling out grocery list...</div>
    } if (groceryPull.error) {
        return <div>Your grocery list blew away...</div>
    }

    //ideas for sorting list by categories with items first 
    // map through the commented out categoryObjs array instead of categories and add an if to the categoryObjs.map for if category.hasItems==true, else will print the remaining

    return (<>
        {/* title, subtitle, and add to list and edit buttons*/}
        <div>
            <h1>Your Grocery List</h1>
            <h3>Check things off to add them to your pantry!</h3>
            <button title="Edit Item" onClick={GroceryEdit}>{editIcon}</button>
            <button title="Add New Item" onClick={AddItem}>{addIcon}</button>
        </div>
        {/* alphabetically ordered categories -- add logic for populated cats first */}
        <div>
            {categories.map((category) => {
                return (
                    <>
                        <h3>{category.icon} {category.name}</h3>
                        {groceryList.map((item) => {
                            if (item.category == category.name.toLowerCase()) {
                                return (
                                    <li key={item.id}>
                                        {item.ownerId ? <>{item.userInitial}</> : <>&ensp;</>}
                                        <input
                                            type="checkbox"
                                            defaultChecked={item.inPantry}
                                            onChange={(e) => { handleCheck(item.id, e.target.checked) }}
                                        />
                                        {item.name}
                                    </li>
                                )
                            }
                        })}
                        <AddToCategory category={category.name} />
                    </>
                )
            })}
        </div >
    </>
    )
}