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
                <li className="alertkey" id="noSharing" >{notSharingIcon} Please don't eat</li>
                <li className="alertkey" id="sharing">{sharingIcon} Please eat</li>
                <li className="alertkey" id="isLow">{alertIcon} Running Low</li>
                <li className="alertkey">{initialIcon} Belongs to User</li>
            </ul>
            <ul className="accordion">Item Actions
                <li className="actionkey">{addIcon} Add</li>
                <li className="alertkey">{editIcon} Edit</li>
                <li className="alertkey">{deleteIcon} Delete</li>
            </ul>
            <ul className="accordion" onClick={()=>{setExpand(!expand)}}>Food Categories {expand?upIcon:downIcon}
                {expand && categories.map((cat) => {
                    return (<li key={cat.name} className="categorykey">{cat.icon} {cat.name}</li>)
                })}
            </ul>
        </>
    )
}