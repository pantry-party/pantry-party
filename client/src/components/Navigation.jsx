//navigation pane
import { Link } from 'react-router-dom'
import { useState } from 'react'
import KeyAccordion from './KeyAccordion'
import { plusIcon, minusIcon, downIcon, upIcon } from "../styles/icons"

export default function Navigation() {
    const [showKey, setShowKey] = useState(false)

    return (<nav>
        <Link to={"/"}>Account</Link>
        <br />
        <Link to={"/pantry"}>Pantry</Link>
        <br />
        <Link to={"/groceryList"}>Grocery List</Link>
        <br />
        <Link onClick={() => { setShowKey(!showKey) }}>Key {!showKey ? downIcon : upIcon}</Link>
        <br />
        {showKey && <KeyAccordion />}
    </nav>)
}