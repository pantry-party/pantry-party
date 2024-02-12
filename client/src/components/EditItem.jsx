//drop down edit form available on pantry and grocery lists
import { useState } from "react"

export default function EditItem () {
    const [key, setKey] = useState('')
    
    function handleSubmit(e) {
        e.preventDefault()

        if (key === "category") {
            return <EditCategory />
        } else if (key ==="ownerId") {
            return <EditOwner />
        } else if (key ==="sharing") {
            return <EditSharing />
        } else if (key ==="isLow") {
            return <EditInventory />
        } else if (key ==="expiry") {
            return <EditExpiry />
        }
    }

    return (<form onSubmit={handleSubmit}>
        <label name="update">What would you like to update?
            <select
                name="update"
                value={key}
                onChange={(event) => {setKey(event.target.value)}}
            >
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

    return (<form></form>)
}

function EditOwner () {

    return (<form></form>)
}

function EditSharing () {

    return (<form></form>)
}

function EditInventory () {

    return (<form></form>)
}

function EditExpiry () {

    return (<form>
        <label></label>
    </form>)
}