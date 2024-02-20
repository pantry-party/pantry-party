import { useState, useContext } from "react"
import { addIcon } from "../styles/icons"
import { useCreateItemMutation } from "../storage/pantryPartyApi"
import { useSelector } from "react-redux"

export default function AddToCategory({ category }) {
    const [createItem, itemCreation] = useCreateItemMutation()
    const [name, setName] = useState("")
    const userInfo = useSelector((it) => it.state.user)
    const householdId = userInfo.sharedHouse || userInfo.defaultHouse

    if (itemCreation.isLoading) {
        return <div>Loading...</div>
    } if (itemCreation.isError) {
        return <div>{itemCreation.error.error}</div>
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const dateMoved = new Date()
        if (name == "") {
        } else {
            await createItem({
                name,
                category,
                dateMoved,
                householdId: householdId,
                inPantry: false
            })
        }
        setName("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <button title="Add Item" type="submit"> {addIcon} </button>
            <input
                type="text"
                placeholder={category}
                value={name}
                onChange={(e) => { setName(e.target.value) }}
            />
        </form>
    )
}
