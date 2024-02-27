import { useContext } from "react"
import { categoriesContext } from "../storage/context.jsx"
import { householdContext } from "../storage/context.jsx"

export function pantrySort (data, sortStyle) {
    const categories = useContext(categoriesContext)
    const household = useContext(householdContext)

    function createWeeks() {
        //print out all mondays from 1 year ago to today
        let dateSet = []
        let day
        let weekStart
        let weekEnd
        for (let i = 0; i < 366; i++) {
          day = new Date()
          day.setDate(day.getDate() - 365)
          day.setHours(0, 0, 0, 0)
          day.setDate(day.getDate() + i)
          if (day.getDay() === 1) {
            weekStart = day
          } else if (i === 365 || day.getDay() === 0 && weekStart) {
            weekEnd = day
          }
    
          if (day.getDay() === 1 && i === 365) {
            weekEnd = day
          }
    
          if (weekStart && weekEnd) {
            let week = { weekStart, weekEnd, items: [], name: `Week of ${weekStart.toLocaleDateString()}` }
            dateSet.push(week)
            weekStart = null
            weekEnd = null
          }
        }
    
        data.forEach((item) => {
          let moved = new Date(item.dateMoved)
          moved.setHours(0, 0, 0, 0)
          dateSet.forEach((week) => {
            if (week.weekStart <= moved && moved <= week.weekEnd) {
              week.items.push(item)
            }
          })
        })
    
        return dateSet
      }

    function categorySort () {
        const items = []
        
        categories.forEach((category) => {    
            let itemholder = {...category}
            itemholder.items = []
            data.forEach((item) => {
                if (item.category === category.name.toLowerCase()) {
                    itemholder.items.push(item)
                }
            })
            items.push(itemholder)
        })

        return items
      }
      
    function ownershipSort () {
        const items = []
        let householdItems = {name: "Household", items: []}
        data.forEach((item) => {
            if (item.ownerId === null) {
                householdItems.items.push(item)
            }
        })
        items.push(householdItems)

        household.users.forEach((user) =>{
            let itemholder = {name: user.name, color: user.color, items: []}
            data.forEach((item) => {
                if (item.ownerId === user.id) {
                    itemholder.items.push(item)
                }
            })
            items.push(itemholder)
        })
        return items
    }

    if (sortStyle === "date") {
        return createWeeks()
    } else if (sortStyle === "category") {
        return categorySort()
    } else if (sortStyle === "owner") {
        return ownershipSort()
    }
}