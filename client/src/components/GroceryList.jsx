//content/display of grocery list
import { useState } from "react"
import { useGetGroceryItemsbyHouseholdIdQuery } from "../storage/pantryPartyApi"
import { editIcon, addIcon } from "../styles/icons"

export default function GroceryList() {
    const categories = [
        "Cans & Bottles",
        "Dairy",
        "Dry Goods",
        "Freezer",
        "Meals",
        "Produce",
        "Proteins",
        "Other"
    ]

    const groceryPull = useGetGroceryItemsbyHouseholdIdQuery(5)
    if (groceryPull.isLoading) {
        return <div>Pulling out grocery list...</div>
    }
    const groceryList = groceryPull.data

    console.log(groceryList)
    return (<>
        {/* title, subtitle, and add to list and edit buttons*/}
        <div>
            <h1>Your Grocery List</h1>
            <h3>Check things off to add them to your pantry!</h3>
            <button title="Edit Item">{editIcon}</button>
            <button title="Add New Item">{addIcon}</button>
        </div>
        {/* alphabetically ordered categories where items>0 */}
        <div>
            {categories.map((cat) => {
                console.log(cat.toLowerCase())
                return (<>
                    <h4>{cat}</h4>
                    {groceryList.map((item) => {
                        if (item.category == cat.toLowerCase()) {
                            return (
                                <li>
                                    {item.ownerId ? <>{item.userInitial}</> : <>&ensp;</>}
                                    <input type="checkbox"></input>
                                    {item.name}
                                </li>
                            )
                        }
                    })}
                    <li>
                        <button title="Add Item">{addIcon}</button>
                        <input placeholder={cat}></input>
                    </li>
                </>)
            })}

        </div>
    </>
    )
}