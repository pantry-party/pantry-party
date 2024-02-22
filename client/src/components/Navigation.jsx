//navigation pane
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import KeyAccordion from './KeyAccordion'
import { groceryListIcon, deleteIcon, pantryIcon, downIcon, upIcon } from "../styles/icons"
import  "../styles/nav.css"
import  "../styles/drag-drop.css"
import { useEditItemMutation, useDeleteItemMutation } from "../storage/pantryPartyApi"

export default function Navigation({ drag, dragIt, setDrag }) {
    const [showKey, setShowKey] = useState(false)
    const location = useLocation()
    const [deleteItem, deletedItem] = useDeleteItemMutation()
    const [editItem, editedItem] = useEditItemMutation()
    const [pantry, setPantry] = useState(false)

    useEffect(() => {
        if (location.pathname === "/pantry") {
            setPantry(true)
        }

        if (location.pathname === "/groceryList") {
            setPantry(false)
        }
    }, [location.pathname])

    return (<nav>
        <div className="party">
           <p className="navIcon"> {pantryIcon} </p> 
        </div>
        <div className="navItems">
        <Link to={"/"} className="navLink">Account</Link>
        <Link to={"/pantry"} className="navLink">Pantry</Link>
        <Link to={"/groceryList"} className="navLink">Grocery List</Link>
        </div> 
        <div className="key">
        <Link onClick={() => { setShowKey(!showKey) }}>Key {!showKey ? downIcon : upIcon}</Link>
        {showKey && <KeyAccordion />}
        </div>
        {drag && <div className='dropzones'>
            {pantry && <div
                className='dropzone'
                onDragOver={e => {e.preventDefault(); e.target.classList.add("dragover");}}
                onDragLeave={(e) => {e.target.classList.remove("dragover")}}
                onDrop={() => {
                    editItem({id: dragIt, inPantry: false, expiry: null, isLow: false})
                    setDrag(false)
                }}
            >{groceryListIcon}</div>}
            <div
                className='dropzone'
                onDragOver={e => {e.preventDefault(); e.target.classList.add("dragover");}}
                onDragLeave={(e) => {e.target.classList.remove("dragover")}}
                onDrop={() => {deleteItem(dragIt); setDrag(false);}}
            >{deleteIcon}</div>
        </div>}
    </nav>)
}