//drop down edit form available on pantry and grocery lists
import { useContext, useState, useRef } from "react"
import { useEditItemMutation } from "../storage/pantryPartyApi"
import "../styles/colors.css"
import { categoriesContext } from "../storage/context.jsx"
import { sharingIcon, notSharingIcon, alertIcon, deleteIcon } from "../styles/icons.jsx"

export default function EditItem ({item, user}) {
    const [key, setKey] = useState('')
    
    const [category, setCategory] = useState(item.category)
    const [ownerId, setOwnerId] = useState(item.ownerId)
    const [sharing, setSharing] = useState(item.sharing)
    const [isLow, setIsLow] = useState(item.isLow)
    const [inPantry, setInPantry] = useState(item.inPantry)
    // let move = useRef(false)
    
    const [changeForm, setChangeForm] = useState('base')
    const [edit, itemEdit] = useEditItemMutation()

    const categories = useContext(categoriesContext)

    if (changeForm === "category") {
        return <EditCategory />
    } else if (changeForm === "ownerId") {
        return <EditOwner />
    } else if (changeForm === "sharing") {
        return <EditSharing />
    } else if (changeForm === "isLow") {
        return <EditInventory />
    } else if (changeForm === "expiry") {
        return <EditExpiry />
    } else if (changeForm === "base") {
        return <BaseForm />
    }
    
    function handleSubmit(e) {
        e.preventDefault()

        console.log(key)

        setChangeForm(key)
    }

    function saveChange(e) {
        e.preventDefault()
        if (changeForm === "base") {
            return
        }

        console.log(category, ownerId, sharing, isLow, inPantry)
    }
    
    function BaseForm () {

        return (<form onSubmit={handleSubmit}>
            <h3>{item.name}</h3>
            {itemEdit.isError && <p>Error editing item: {itemEdit.error.error}</p>}
            <label name="update">What would you like to update?
                <select
                    name="update"
                    value={key}
                    onChange={(event) => {setKey(event.target.value)}}
                >
                    <option>Select</option>
                    <option value="category" >Category</option>
                    <option value="ownerId" >Ownership</option>
                    <option value="sharing" >Sharing</option>
                    <option value="isLow" >Inventory</option>
                    <option value="expiry" >Expiry</option>
                </select>
            </label>
            <br />
            <button type="Submit" >Continue</button>
        </form>)
    }

    function EditCategory () {
        
        return (<form onSubmit={saveChange}>
            <fieldset name={category} onChange={(e) => {setCategory(e.target.value)}}>
                <legend>Update the category of {item.name}: </legend>
                <label>Cans & Bottles
                    <input type="radio" name={key} value="cans & bottles" defaultChecked={category === "cans & bottles"} />
                </label>
                <br />
                <label>Dairy
                    <input type="radio" name={key} value="dairy" defaultChecked={category === "dairy"} />
                </label>
                <br />
                <label>Dry Goods
                    <input type="radio" name={key} value="dry goods" defaultChecked={category === "dry goods"} />
                </label>
                <br />
                <label>Freezer
                    <input type="radio" name={key} value="freezer" defaultChecked={category === "freezer"} />
                </label>
                <br />
                <label>Meals
                    <input type="radio" name={key} value="meals" defaultChecked={category === "meals"} />
                </label>
                <br />
                <label>Produce
                    <input type="radio" name={key} value="produce" defaultChecked={category === "produce"} />
                </label>
                <br />
                <label>Proteins
                    <input type="radio" name={key} value="proteins" defaultChecked={category === "proteins"} />
                </label>
                <br />
                <label>Other
                    <input type="radio" name={key} value="other" defaultChecked={category === "other"} />
                </label>
            </fieldset>
            <button onClick={() => {setChangeForm('base')}}>Back</button>
            <button type="submit" >Save</button>
        </form>)
    }

    

    function EditOwner () {

        return (<form onSubmit={saveChange}>
            <fieldset name={key} onChange={(e) => {setOwnerId(e.target.value)}} >
                <legend>Update the ownership of {item.name}: </legend>
                <label>Set as mine <span className={user.color} >{categories.find((category) => item.category === category.name.toLowerCase()).icon}</span>
                    <input type="radio" name={key} value={user.id} defaultChecked={+ownerId === user.id} />
                </label>
                <br />
                <label>Set as household {categories.find((category) => item.category === category.name.toLowerCase()).icon}
                    <input type="radio" name={key} value={0} defaultChecked={ownerId === null} />
                </label>
            </fieldset>
            <button onClick={() => {setChangeForm('base')}}>Back</button>
            <button type="submit" >Save</button>
        </form>)
    }

    function EditSharing () {

        return (<form onSubmit={saveChange}>
            <fieldset name={key} onChange={(e) => {setSharing(e.target.value)}} >
                <legend>Update the sharing status of {item.name}: </legend>
                <label>Set as "to share" <span className="green" >{sharingIcon}</span>
                    <input type="radio" name={key} value={true} defaultChecked={sharing} />
                </label>
                <br />
                <label>Set as "don't eat" <span className="red" >{notSharingIcon}</span>
                    <input type="radio" name={key} value={false} defaultChecked={sharing === false} />
                </label>
                <br />
                <label>No status
                    <input type="radio" name={key} value={0} defaultChecked={sharing === null} />
                </label>
            </fieldset>
            <button onClick={() => {setChangeForm('base')}}>Back</button>
            <button type="submit" >Save</button>
        </form>)
    }

    function EditInventory () {
        

        return (<form onSubmit={saveChange} >
            <fieldset name={key} onChange={(e) => {setIsLow(e.target.value)}} >
                <legend>Update the Inventory of {item.name}: </legend>
                <label>Set as "running low" <span className="green" >{alertIcon}</span>
                    <input type="radio" name={key} value={true} defaultChecked={isLow} />
                </label>
                <br />
                <label>Set as "finished" {deleteIcon}
                    <input type="radio" name={key} value={"delete"} />
                </label>
                <br />
                <label>Not low
                    <input type="radio" name={key} value={false} defaultChecked={!isLow} />
                </label>
            </fieldset>
            <label>Add to grocery list
                <input type="checkbox" name='inPantry' checked={!inPantry} value={false} onChange={(e) => {
                    setInPantry(e.target.value)
                    console.log(inPantry)
                    }} />
            </label>
            <br />
            <button onClick={() => {setChangeForm('base')}}>Back</button>
            <button type="submit" >Save</button>
        </form>)
    }
}









function EditExpiry () {

    return (<form>
        <label></label>
    </form>)
}