//add new form available on pantry and grocery list 
import { useState, useContext } from "react"
import { categoriesContext, userContext } from "../storage/context"
import { useCreateItemMutation } from "../storage/pantryPartyApi"
import { addIcon } from "../styles/icons"

export default function AddItem({ householdId, location }) {
    const categories = useContext(categoriesContext)
    const userInfo = useContext(userContext)

    const [createNewItem, newItem] = useCreateItemMutation()

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [ownerId, setOwnerId] = useState(null)
    const [error, setError] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        const dateMoved = new Date()
        if (name == "") {
            setError("Item needs a name")
        } else {
            await createNewItem({
                name,
                category,
                dateMoved,
                householdId: householdId,
                ownerId,
                inPantry: false
            })
        }
        setName("")
        setCategory("select")
        setOwnerId(null)
    }

    if (location = "groceryList") {
        return (
            //grocery list add new item
            <div id="addItemForm">
                <h2>Add a New Item</h2>
                <form onSubmit={handleSubmit}>
                    <label for="name">Item name: </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Potato"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    /><br />
                    <label for="category">Category: </label>
                    <select for="category" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                        <option selected="true" disabled="disabled" value="select">Select</option>
                        {categories.map((cat) => {
                            return (<option key={cat.name} value={cat.name.toLowerCase()}>{cat.name}</option>)
                        })}
                    </select><br />
                    <label for="ownership">Ownership: </label>
                    <input
                        id="ownership"
                        type="checkbox"
                        defaultChecked={false}
                        onChange={(e) => {
                            if (ownerId != null) { setOwnerId(null) }
                            else { setOwnerId(userInfo.id) }
                        }}
                    /> This is my Item! <br />
                    <button type="submit">{addIcon} Add to List</button>
                </form>
                {error && <h5>{error}</h5>}
            </div>
        )
    } else if (location = "pantry") {
        // pantry add new item

    }
}