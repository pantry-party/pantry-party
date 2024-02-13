import {createContext} from "react"
import {bottlesIcon, dairyIcon, dryIcon, freezerIcon, mealsIcon, produceIcon, proteinIcon, otherIcon } from "../styles/icons"

export const categoriesContext = createContext([
    { name: "Cans & Bottles", icon: bottlesIcon },
    { name: "Dairy", icon: dairyIcon },
    { name: "Dry Goods", icon: dryIcon},
    { name: "Freezer", icon: freezerIcon},
    { name: "Meals", icon: mealsIcon},
    { name: "Produce", icon: produceIcon},
    { name: "Proteins", icon: proteinIcon},
    { name: "Other", icon: otherIcon}
])

// import { categoriesContext } from "../storage/context.jsx" -> at the top with other imports
// const categories = useContext(categoriesContext) -> where your useState variables etc go
// {categories.map((category) => {return <div> <p> {category.icon} {category.name} </p> </div>}) }

export const userContext = createContext({})
export const tokenContext = createContext(null)
export const householdContext = createContext({})
export const housenameContext = createContext("")
