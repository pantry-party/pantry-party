import { PieChart, Pie, Cell, LabelList } from 'recharts'
import { useGetCountsbyOwnerQuery, useGetItemsbyHouseholdIdQuery } from "../storage/pantryPartyApi"
import { userIcon } from "../styles/icons"

export default function AccountStats({ user }) {
    const ownerCounts = useGetCountsbyOwnerQuery(user.id)
    const data = ownerCounts.data
    const newOwners= []
    const PieColors = []
    let height = 0

    if (ownerCounts.isLoading) {
        return <>is loading...</>
    }

    data.forEach((ele) => {
        let location = { value: +ele.items }
        if (location.value > 0) {
            height = 150
        }

        if (!ele.inPantry) {
            location.name = "grocery"
        } else {
            location.name = "pantry"
        }
        newOwners.push(location)
    })

    // colors
    if (user.color === "red") {
        PieColors.push("#ff8080", "#ff4d4d")
    }
    if (user.color === "orange") {
        PieColors.push("#ffbb99", "#ff9966")
    }
    if (user.color === "yellow") {
        PieColors.push("#ffff99", "#ffff33")
    }
    if (user.color === "green") {
        PieColors.push("#99ff99", "#66ff66")
    }
    if (user.color === "teal") {
        PieColors.push("#70dbdb", "#33cccc")
    }
    if (user.color === "blue") {
        PieColors.push("#80bfff", "#4da6ff")
    }
    if (user.color === "purple") {
        PieColors.push("#bb99ff", "#9966ff")
    }
    if (user.color === "pink") {
        PieColors.push("#ffcce6", "#ff99ce")
    }

    return (<div className="householdMember">
        <div className="userInfo" key={user.id}>
            <p className={user.color} > {userIcon} &nbsp; </p>
            <p id={user.id}> {user.name} </p>
        </div>
        <PieChart className="piechart" width={250} height={height} title={`${user.name}'s Stats`}>
            <Pie
                data={newOwners}
                dataKey="value"
                nameKey="name"
                outerRadius={50}
                cx="50%"
                cy="50%"
                fill={user.color}
            >
                {newOwners.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PieColors[index]} stroke="#3D3D5C" />
                ))}
                <LabelList
                    dataKey="name"
                    fill="#3D3D5C"
                    position="outside"
                />
                <LabelList
                    dataKey="value"
                    fill="#3D3D5C"
                    position="inside"
                />
            </Pie>
        </PieChart>
    </div>)
}

export function HouseholdStats({ household }) {
    const householdItemsList = []
    const householdMembers = household.users
    const householdColors = ["#d3d3d3"]
    const householdItems = useGetItemsbyHouseholdIdQuery(household.id)
    const items = householdItems.data

    householdMembers.map((member) => {
        if (member.color === "red") { householdColors.push("#ff4d4d") }
        if (member.color === "orange") { householdColors.push("#ff9966") }
        if (member.color === "yellow") { householdColors.push("#ffff33") }
        if (member.color === "green") { householdColors.push("#66ff66") }
        if (member.color === "teal") { householdColors.push("#33cccc") }
        if (member.color === "blue") { householdColors.push("#4da6ff") }
        if (member.color === "purple") { householdColors.push("#9966ff") }
        if (member.color === "pink") { householdColors.push("#ff99ce") }
    })

    if (householdItems.isLoading) {
        return <>is loading...</>
    }

    householdItemsList.push({ name: null, count: 0, user: "household" })
    householdMembers.map((member) => {
        householdItemsList.push({ name: member.id, count: 0, user: member.name })
    })

    items.map((item) => {
        let newItems = []
        householdItemsList.map((stuff) => {
            if (item.ownerId === stuff.name) {
                stuff.count++
            }
        })
        if (newItems.name) {
            householdItemsList.push(newItems)
        }
    })
    const cleanup = () => {
        householdItemsList.map((item)=> {
            if (item.count === 0) {
                householdItemsList.pop(item)
            }
        })
    }
    cleanup()

    return (
        <PieChart className="piechart" width={300} height={150} title={`Household Stats`}>
            <Pie
                data={householdItemsList}
                dataKey="count"
                nameKey="name"
                outerRadius={50}
                cx="50%"
                cy="50%"
            >
                {householdItemsList.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={householdColors[index]} stroke="#3D3D5C" title={householdItemsList.name} />
                ))}
                <LabelList
                    dataKey="user"
                    fill="#3D3D5C"
                    position="outside"
                />
                <LabelList
                    dataKey="count"
                    fill="#3D3D5C"
                    position="inside"
                />
            </Pie>
        </PieChart>
    )
}