import { alertIcon, sharingIcon, notSharingIcon, editIcon, deleteIcon, addIcon, initialIcon, downIcon, upIcon} from "../styles/icons"
import { useContext, useState } from "react"
import { categoriesContext } from "../storage/context"
import "../styles/nav.css"

export default function KeyAccordion() {
    const categories = useContext(categoriesContext)
    const [expand, setExpand] = useState(false)

    return (
        <>
            <ul className="accordion">Alerts
                <li>{notSharingIcon} Please don't eat</li>
                <li>{sharingIcon} Please eat</li>
                <li>{alertIcon} Running Low</li>
                <li>{initialIcon} Belongs to User</li>
            </ul>
            <ul className="accordion">Item Actions
                <li>{addIcon} Add</li>
                <li>{editIcon} Edit</li>
                <li>{deleteIcon} Delete</li>
            </ul>
            <ul className="accordion" onClick={()=>{setExpand(!expand)}}>Food Categories {expand?upIcon:downIcon}
                {expand && categories.map((cat) => {
                    return (<li key={cat.name}>{cat.icon} {cat.name}</li>)
                })}
            </ul>
        </>
    )
}