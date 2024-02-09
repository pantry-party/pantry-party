//navigation pane
import { Link } from 'react-router-dom'

export default function Navigation () {

    return (<nav>
        <Link to={'/'}>Account</Link>
        <br />
        <Link to={'/pantry'}>Pantry</Link>
        <br />
        <Link to={'/groceryList'}>Grocery List</Link>
    </nav>)
}