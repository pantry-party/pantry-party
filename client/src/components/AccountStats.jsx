import React from 'react'
import { PieChart, Pie, Cell, Bar, ResponsiveContainer } from 'recharts'
import { useGetCountsbyOwnerQuery, useGetCountsbyHouseholdQuery } from "../storage/pantryPartyApi"
import { userIcon } from "../styles/icons"

export default function AccountStats({ user }) {
    const ownerCounts = useGetCountsbyOwnerQuery(user.id)
    const data = ownerCounts.data
    const newOwners = []
    const PieColors = ["#bce893", "#44a7e1", "#556cfb", "#f4b040"];

    // ownerCounts[0].name="grocery"
    // ownerCounts[1].name="pantry"
   
    if(ownerCounts.isLoading){
        return <>is loading...</>
    }
    data.forEach((ele)=>{
        let user = {name, value: +ele.items}
        if(!ele.inPantry){
            user.name="grocery"
        } else {
            user.name="pantry"
        }
        newOwners.push(user) 
    })

    // console.log(newOwners)
    // console.log(ownerCounts)

    return (<>
        <div className="userInfo" key={user.id}>
            <p className={user.color} > {userIcon} &nbsp; </p>
            <p id={user.id}> {user.name} </p>
        </div>
        {console.log(newOwners)}
        <PieChart className="piechart" width={100} height={100} title="Hello">
            
            {console.log('here')}
            {console.log(newOwners)}
            <Pie
                data={newOwners}
                dataKey="value"
                outerRadius={50}
                cx="50%"
                cy="50%"
                fill={user.color}
                >
            {newOwners.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={PieColors[index]} />
            ))}
            </Pie>
             {console.log('there')}
        </PieChart>
        
    </>)
}