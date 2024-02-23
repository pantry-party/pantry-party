//add new form available on pantry and grocery list 
import { useState, useContext } from "react"
import { categoriesContext, userContext } from "../storage/context"
import { useCreateItemMutation } from "../storage/pantryPartyApi"
import { addIcon } from "../styles/icons"
import { useSelector } from "react-redux"

export default function AddItem({ householdId, location, setAddForm }) {
    const loc = location
    const categories = useContext(categoriesContext)
    const userInfo = useSelector((it) => it.state.user)

    const [createNewItem, newItem] = useCreateItemMutation()

    const [name, setName] = useState("")
    const [category, setCategory] = useState("select")
    const [ownerId, setOwnerId] = useState(false)
    const [expiry, setExpiry] = useState(null)
    const [sharing, setSharing] = useState(null)
    const [error, setError] = useState("")

    async function handleGrocerySubmit(e) {
        e.preventDefault()
        setError("")
        const dateMoved = new Date()
        if (name == "") {
            setError("Item needs a name")
        } else if (category == "select") {
            setError("Item needs a category")
        } else if (ownerId == false) {
            try {
                await createNewItem({
                    name,
                    category,
                    dateMoved,
                    householdId: householdId,
                    inPantry: false
                })
            }
            catch (error) {
                setError(error)
            }
            setName("")
            setCategory("select")
            setOwnerId(false)
            setAddForm(false)
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
            setName("")
            setCategory("select")
            setOwnerId(false)
            setAddForm(false)
        }
    }

    async function handlePantrySubmit(e) {
        e.preventDefault()
        setError("")
        const dateMoved = new Date()
        if (name == "") {
            setError("Item needs a name")
        } else if (category == "select") {
            setError("Item needs a category")
        } else if (ownerId == false) {
            try {
                await createNewItem({
                    name,
                    category,
                    dateMoved,
                    householdId: householdId,
                    sharing,
                    inPantry: true
                })
            }
            catch (error) {
                setError(error)
            }
            setName("")
            setCategory("select")
            setOwnerId(false)
        } else {
            try {
                await createNewItem({
                    name,
                    category,
                    dateMoved,
                    householdId: householdId,
                    ownerId,
                    sharing,
                    inPantry: true
                })
            }
            catch (error) {
                setError(error)
            }
            setName("")
            setCategory("select")
            setOwnerId(false)
        }
    }

    if (loc == "groceryList") {
        return (
            //grocery list add new item
            <div id="addItemForm">
                <h2>Add a New Item</h2>
                <form className="addForm" onSubmit={handleGrocerySubmit}>
                    <label for="name">Item name:
                        <input
                            id="name"
                            type="text"
                            placeholder="Potato"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        /></label>
                    <label for="category">Category:
                        <select for="category" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                            <option selected="true" disabled="disabled" value="select">Select</option>
                            {categories.map((cat) => {
                                return (<option key={cat.name} value={cat.name.toLowerCase()}>{cat.name}</option>)
                            })}
                        </select></label>
                    <label for="ownership">Ownership:
                        <span>
                            <input
                                id="ownership"
                                type="checkbox"
                                checked={ownerId}
                                onChange={(e) => {
                                    ownerId == false ? setOwnerId(userInfo.id) : setOwnerId(false)
                                }}
                            /> This is my Item! </span>
                    </label>
                    <button className="addSubmitButton" type="submit">{addIcon} Add to List</button>
                </form>
                {error && <h5>{error}</h5>}
            </div>
        )
    } else if (loc == "pantry") {
        return (
            // pantry add new item
            <div id="addItemForm">
                <h2>Add a New Item</h2>
                <form className="addForm" onSubmit={handlePantrySubmit}>
                    <label for="name">Item name:
                        <input
                            id="name"
                            type="text"
                            placeholder="Potato"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        /></label>
                    <label for="expiry">Expiration:
                        <input
                            id="expiry"
                            type="date"
                            value={expiry}
                            onChange={(e) => { setExpiry(e.target.value) }}
                        /></label>
                    <label for="category">Category:
                        <select for="category" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                            <option selected="true" disabled="disabled" value="select">Select</option>
                            {categories.map((cat) => {
                                return (<option key={cat.name} value={cat.name.toLowerCase()}>{cat.name}</option>)
                            })}
                        </select></label>
                    <label for="ownership">Ownership:
                        <span>
                            <input
                                id="ownership"
                                type="checkbox"
                                checked={ownerId}
                                onChange={(e) => {
                                    ownerId == false ? setOwnerId(userInfo.id) : setOwnerId(false)
                                }}
                            /> This is my Item!
                        </span>
                    </label>
                    <label for="ownership">Sharing:&nbsp;
                        <fieldset onChange={(e) => { setSharing(e.target.value) }}>
                            <label for="share">
                                <input type="radio" name="sharing" id="share" value={true} />
                                &nbsp; Please eat!</label>
                            <label for="dontshare">
                                <input type="radio" name="sharing" id="dontshare" value={false} />
                                &nbsp; Please don't eat!</label>
                            <label for="nopref">
                                <input type="radio" name="sharing" id="nopref" value={null} defaultChecked />
                                &nbsp; No preference</label>
                        </fieldset></label>
                    <button className="addSubmitButton" type="submit">{addIcon} Add to List</button>
                </form>
                {error && <h5>{error}</h5>}
            </div >
        )
    }
}