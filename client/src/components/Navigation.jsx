//navigation pane
import { Link } from 'react-router-dom'
import { useState } from 'react'
import KeyAccordion from './KeyAccordion'
import { plusIcon, pantryIcon, downIcon, upIcon } from "../styles/icons"
import  "../styles/nav.css"

export default function Navigation() {
    const [showKey, setShowKey] = useState(false)

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
    </nav>)
}