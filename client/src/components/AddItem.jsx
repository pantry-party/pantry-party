//add new form available on pantry and grocery list 
import { useState, useContext } from "react"
import { categoriesContext, userContext } from "../storage/context"
import { useCreateItemMutation } from "../storage/pantryPartyApi"
import { addIcon } from "../styles/icons"

export default function AddItem({ householdId, location }) {
    const loc = location
    const categories = useContext(categoriesContext)
    const userInfo = useContext(userContext)

    const [createNewItem, newItem] = useCreateItemMutation()

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [ownerId, setOwnerId] = useState(null)
    const [expiry, setExpiry] = useState(null)
    const [sharing, setSharing] = useState(null)
    const [error, setError] = useState("")

    async function handleGrocerySubmit(e) {
        e.preventDefault()
        const dateMoved = new Date()
        if (name == "") {
            setError("Item needs a name")
        } else {
            try {
                await createNewItem({
                    name,
                    category,
                    dateMoved,
                    householdId: householdId,
                    ownerId,
                    inPantry: false
                })
            }
            catch (error) {
                setError(error)
            }
        }
        setName("")
        setCategory("select")
        setOwnerId(null)
        setError("")
    }

    async function handlePantrySubmit(e) {
        e.preventDefault()
        const dateMoved = new Date()
        if (name == "") {
            setError("Item needs a name")
        } else {
            try {
                await createNewItem({
                    name,
                    category,
                    expiry,
                    dateMoved,
                    householdId: householdId,
                    ownerId,
                    sharing: sharing,
                    inPantry: true
                })
            }
            catch (error) {
                setError(error)
            }
        }
        setName("")
        setCategory("select")
        setOwnerId(null)
        setExpiry(null)
        setSharing(null)
        setError("")
    }

    if (loc == "groceryList") {
        return (
            //grocery list add new item
            <div id="addItemForm">
                <h2>Add a New Item</h2>
                <form onSubmit={handleGrocerySubmit}>
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
    } else if (loc == "pantry") {
        return (
            // pantry add new item
            <div id="addItemForm">
                <h2>Add a New Item</h2>
                <form onSubmit={handlePantrySubmit}>
                    <label for="name">Item name: </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Potato"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    /><br />
                    <label for="expiry">Expiration: </label>
                    <input
                        id="expiry"
                        type="date"
                        value={expiry}
                        onChange={(e) => { setExpiry(e.target.value) }}
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
                    <label for="ownership">Sharing: </label>
                    <fieldset onChange={(e) => { setSharing(e.target.value) }}>
                        <input type="radio" name="sharing" id="share" value={true} />
                        <label for="share">Please eat!</label><br />
                        <input type="radio" name="sharing" id="dontshare" value={false} />
                        <label for="dontshare">Please don't eat!</label><br />
                        <input type="radio" name="sharing" id="nopref" value={null} defaultChecked />
                        <label for="nopref">No preference</label><br />
                    </fieldset><br />
                    <button type="submit">{addIcon} Add to List</button>
                </form>
                {error && <h5>{error}</h5>}
            </div>
        )
    }
}