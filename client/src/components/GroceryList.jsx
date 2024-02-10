//content/display of grocery list
import { useState } from "react"
import { useGetGroceryItemsbyHouseholdIdQuery } from "../storage/pantryPartyApi"
import { editIcon, addIcon } from "../styles/icons"
import { handleCheck, addToCategory } from "./GroceryFunctions"
import GroceryEdit from "./GroceryEdit"
import AddItem from "./AddItem"

export default function GroceryList() {
    const [itemAdd, setItemAdd] = useState("")

    const groceryPull = useGetGroceryItemsbyHouseholdIdQuery(5)
    if (groceryPull.isLoading) {
        return <div>Pulling out grocery list...</div>
    }
    const groceryList = groceryPull.data
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

    // const categoryObjs = [
    //     { name: "Cans & Bottles", hasItems: false },
    //     { name: "Dairy", hasItems: false },
    //     { name: "Dry Goods", hasItems: false },
    //     { name: "Freezer", hasItems: false },
    //     { name: "Meals", hasItems: false },
    //     { name: "Produce", hasItems: false },
    //     { name: "Proteins", hasItems: false },
    //     { name: "Other", hasItems: false }
    // ]

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
                return (<>
                    <h4>{category}</h4>
                    {groceryList.map((item) => {
                        if (item.category == category.toLowerCase()) {
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
                    {/* Might be counterintuitive to have add button (submit) to the left of input 
                    ???? how do i make it so that only one form takes typed input, not all???
                    */}

                    <form onSubmit={addToCategory(category)} key={category}>
                        <button title="Add Item" type="submit"> {addIcon} </button>
                        <input
                            type="text"
                            placeholder={category}
                            value={itemAdd}
                            onChange={(e) => { setItemAdd(e.target.value);console.log(setItemAdd) }}
                        />
                    </form>
                </>)

            })}
        </div>
    </>
    )
}