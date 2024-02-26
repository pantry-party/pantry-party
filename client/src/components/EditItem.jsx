//drop down edit form available on pantry and grocery lists
import { useContext, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useEditItemMutation, useDeleteItemMutation, useCreateItemMutation } from "../storage/pantryPartyApi"
import "../styles/colors.css"
import { categoriesContext } from "../storage/context.jsx"
import { sharingIcon, notSharingIcon, alertIcon, deleteIcon } from "../styles/icons.jsx"
import { useLocation } from "react-router-dom"

export default function EditItem({ item }) {
    const user = useSelector((it) => it.state.user)
    const [key, setKey] = useState('')
    const location = useLocation()
    let pantry = true
    if (location.pathname === "/groceryList") {
        pantry = false
    }

    const [category, setCategory] = useState(item.category)
    const [ownerId, setOwnerId] = useState(item.ownerId || 0)
    const [sharing, setSharing] = useState(item.sharing && "sharing")
    const [inventory, setInventory] = useState(item.isLow && "low")

    const [expiry, setExpiry] = useState(new Date(item.expiry))
    const [name, setName] = useState(item.name)

    const [changeForm, setChangeForm] = useState("base")
    const [back, setBack] = useState(false)
    const [move, setMove] = useState(false)
    const [groceryCopy, setGroceryCopy] = useState({})

    const [edit, itemEdit] = useEditItemMutation()
    const [deleteItem, itemDeletion] = useDeleteItemMutation()
    const [createItem, itemCreation] = useCreateItemMutation()

    const categories = useContext(categoriesContext)

    useEffect(() => {
        if (itemEdit.isSuccess && move) {
            console.log(groceryCopy)
            createItem(groceryCopy)
            setGroceryCopy({})
            setMove(false)
        }
    }, [itemEdit.isSuccess, move])

    useEffect(() => {
        if (changeForm === "base") {
            setCategory(item.category)
            setOwnerId(item.ownerId || 0)
            setSharing(item.sharing && "sharing")
            setInventory(item.isLow && "low")
            if (back) {
                setMove(false)
            }
            setExpiry(new Date(item.expiry))
            setName(item.name)
        }
    }, [changeForm])

    if (changeForm === "category") {
        return <EditCategory />
    } else if (changeForm === "name") {
        return <EditName />
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
    } else if (changeForm === "empty") {
        return (<>
            {itemDeletion.isError && <p>Error removing item: {itemDeletion.error.error}</p>}
            {itemDeletion.isSuccess && <p>item removed</p>}
            {itemCreation.isSuccess && <p>item duplicated to groceryList</p>}
        </>)
    }

    function handleSubmit(e) {
        e.preventDefault()

        setChangeForm(key)
    }

    function saveChange(e) {
        e.preventDefault()
        setBack(false)

        let editObj = { id: item.id, name, category, ownerId, sharing }

        if (ownerId == 0) {
            editObj.ownerId = null
        }

        if (sharing === "sharing") {
            editObj.sharing = true
        } else if (sharing === "not sharing") {
            editObj.sharing = false
        } else if (sharing === "ambivalent") {
            editObj.sharing = null
        }

        if (move) {
            let copy = { ...item }
            copy.inPantry = false
            copy.dateMoved = new Date()
            copy.expiry = null
            setGroceryCopy(copy)
        }

        if (inventory === "low") {
            editObj.isLow = true

        } else if (inventory === "delete" && !move) {
            deleteItem(item.id)
            return
        } else if (inventory === "delete" && move) {
            editObj.isLow = false
            editObj.inPantry = false
        } else if (inventory === "not low") {
            editObj.isLow = false
        }

        if (key === "expiry") {
            editObj.expiry = expiry
        }

        setChangeForm("base")
        edit(editObj)
    }

    function BaseForm() {

        return (<form className="editForm" onSubmit={handleSubmit}>
            <h3>{item.name}</h3>
            {itemEdit.isError && <p>Error editing item: {itemEdit.error.error}</p>}
            {itemDeletion.isError && <p>Error removing item: {itemDeletion.error.error}</p>}
            <label name="update">What would you like to update? &nbsp;
                <select
                    name="update"
                    value={key}
                    onChange={(event) => { setKey(event.target.value) }}
                >
                    <option>Select</option>
                    <option value="category" >Category</option>
                    <option value="name" >Name</option>
                    <option value="ownerId" >Ownership</option>
                    {pantry && (<>
                        <option value="sharing" >Sharing</option>
                        <option value="isLow" >Inventory</option>
                        <option value="expiry" >Expiry</option>
                    </>)}

                </select>
            </label>
            <br />
            <div className="editPantryButtons">
                <button onClick={() => { setChangeForm("empty") }}>Back</button>
                &nbsp;
                <button type="Submit"> Continue</button>
            </div>
        </form>)
    }

    function EditName() {

        return (<form className="editForm" onSubmit={saveChange}>
            <label>Name:
                <input value={name} onChange={(e) => { setName(e.target.value) }} />
            </label>
            <div className="editPantryButtons">
                <button onClick={() => { setChangeForm("base") }}>Back</button>
                &nbsp;
                <button type="submit" >Save</button>
            </div>
        </form>)
    }

    function EditCategory() {

        return (<form onSubmit={saveChange}>
            <fieldset className="editForm" id="categoryfields" name="category" onChange={(e) => { setCategory(e.target.value) }}>
                <legend >Update the category of {item.name}: </legend>
                {categories.map((categoryObj, index) => {
                    return <div key={index}>
                        <label id="categorylabel" >{categoryObj.name} &nbsp; {categoryObj.icon}
                            <input
                                type="radio"
                                name={key}
                                value={categoryObj.name.toLowerCase()}
                                defaultChecked={category === categoryObj.name.toLowerCase()}
                            />
                        </label>
                        <br />
                    </div>
                })}
            </fieldset>
            <div className="editPantryButtons">
                <button onClick={() => { setChangeForm("base") }}>Back</button>
                &nbsp;
                <button type="submit" >Save</button>
            </div>
        </form>)
    }

    function EditOwner() {

        return (<form onSubmit={saveChange}>
            <fieldset className="editForm" name={key} onChange={(e) => { setOwnerId(e.target.value) }} >
                <legend>Update the ownership of {item.name}: </legend>
                <label>Set as mine
                    {
                        pantry ? <span className={user.color} >{categories.find((category) => item.category === category.name.toLowerCase()).icon}</span>
                            : <span className={`${item.color} initial`} title={`Belongs to ${user.name}`} > {item.userInitial} </span>
                    }
                    <input type="radio" name={key} value={user.id} defaultChecked={ownerId == user.id} />
                </label>
                <br />
                <label>Set as household {pantry && categories.find((category) => item.category === category.name.toLowerCase()).icon}
                    <input type="radio" name={key} value={0} defaultChecked={ownerId == 0} />
                </label>
            </fieldset>
            <div className="editPantryButtons">
                <button onClick={() => { setChangeForm("base") }}>Back</button>
                &nbsp;
                <button type="submit" >Save</button>
            </div>
        </form>)
    }

    function EditSharing() {

        return (<form  onSubmit={saveChange}>
            <fieldset className="editForm" name={key} onChange={(e) => { setSharing(e.target.value) }} >
                <legend>Update the sharing status of {item.name}: </legend>
                <label id="setShare">To share &nbsp; {sharingIcon}
                    <input type="radio" name={key} value={"sharing"} defaultChecked={sharing === "sharing"} />
                </label>
                <br />
                <label id="setNoShare">Not sharing &nbsp; {notSharingIcon}
                    <input type="radio" name={key} value={"not sharing"} defaultChecked={sharing === "not sharing"} />
                </label>
                <br />
                <label>No status
                    <input type="radio" name={key} value={"ambivalent"} defaultChecked={sharing === "ambivalent"} />
                </label>
            </fieldset>
            <div className="editPantryButtons">
                <button onClick={() => { setChangeForm("base") }}>Back</button>
                &nbsp;
                <button type="submit" >Save</button>
            </div>
        </form>)
    }

    function EditInventory() {
        function checkboxHandle(e) {
            e.preventDefault()

            setMove(!move)
        }

        const runningLow = 'Set as "running low" '
        const finished = 'Set as "finished" '

        return (<form onSubmit={saveChange} >
            <fieldset className="editForm" name={key} onChange={(e) => { setInventory(e.target.value) }} >
                <legend>Update the Inventory of {item.name}: </legend>
                <label id="setLow">{runningLow} &nbsp; {alertIcon} :
                    <input type="radio" name={key} value={"low"} defaultChecked={inventory === "low"} />
                </label>
                <br />
                <label>{finished}:
                    <input type="radio" name={key} value={"delete"} defaultChecked={inventory === "delete"} />
                </label>
                <br />
                <label>Not low
                    <input type="radio" name={key} value={"not low"} defaultChecked={inventory === "not low"} />
                </label>
            </fieldset>
            <label id="groceryCheck" >Add to grocery list
                <input type="checkbox" id='inPantry' checked={move} onChange={(e) => checkboxHandle(e)} />
            </label>
            <br />
            <div className="editPantryButtons">
                <button onClick={() => { setBack(true); setChangeForm("base"); }}>Back</button>
                &nbsp;
                <button type="submit" >Save</button>
            </div>
        </form >)
    }

    function EditExpiry() {

        return (<form className="editForm" onSubmit={saveChange}>
            <label>Update the Expiry of {item.name}:
                <input type="date" name={key} value={expiry} onChange={(e) => setExpiry(e.target.value)} />
            </label>
            <br />
            <div className="editPantryButtons">
                <button onClick={() => { setChangeForm("base") }}>Back</button>
                &nbsp;
                <button type="submit" >Save</button>
            </div>
        </form>)
    }
}
