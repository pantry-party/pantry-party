import React from 'react'
import { PieChart, Pie, BarChart, Bar, ResponsiveContainer } from 'recharts'
import { useGetCountsbyOwnerQuery, useGetCountsbyHouseholdQuery } from "../storage/pantryPartyApi"
import { userIcon } from "../styles/icons"

export default function AccountStats({ user }) {
    const ownerCounts = useGetCountsbyOwnerQuery(user.id)
    const data = ownerCounts.data
    const newOwners = []

    // ownerCounts[0].name="grocery"
    // ownerCounts[1].name="pantry"

    if(ownerCounts.isLoading){
        return <>is loading...</>
    }
    data.forEach((ele)=>{
        let user = {count: ele.items}
        if(!ele.inPantry){
            user.name="grocery"
        } else {
            user.name="pantry"
        }
        newOwners.push(user)
    })

    console.log(newOwners)
    // console.log(ownerCounts)
    return (<>
        <div className="userInfo" key={user.id}>
            <p className={user.color} > {userIcon} &nbsp; </p>
            <p id={user.id}> {user.name} </p>
        </div>

        <PieChart className="piechart" width={100} height={100}>
            {console.log('here')}
            <Pie
                data={newOwners}
                dataKey="count"
                outerRadius={100}
                cx="50%" cy="50%"
                fill="#black"
                label
            />
             {console.log('there')}
        </PieChart>
    </>)
}