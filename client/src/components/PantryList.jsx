//content/display of the pantry
import { useGetPantryItemsbyHouseholdIdQuery } from "../storage/pantryPartyApi"

export default function PantryList () {

    const pantry = useGetPantryItemsbyHouseholdIdQuery(5)

    console.log(pantry)
    return (<div></div>)
}