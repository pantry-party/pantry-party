import React from 'react'
import { PieChart, Pie, Cell, Bar, ResponsiveContainer } from 'recharts'
import { useGetCountsbyOwnerQuery, useGetCountsbyHouseholdQuery } from "../storage/pantryPartyApi"
import { userIcon } from "../styles/icons"

export default function AccountStats({ user }) {
    const ownerCounts = useGetCountsbyOwnerQuery(user.id)
    const data = ownerCounts.data
    const newOwners = []
    const PieColors = [];

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
        PieColors.push("#bb99ff", "#9966ff" )
    }
    if (user.color === "pink") {
        PieColors.push("#ffcce6", "#ff99ce")
    }

    return (<>
        <div className="userInfo" key={user.id}>
            <p className={user.color} > {userIcon} &nbsp; </p>
            <p id={user.id}> {user.name} </p>
        </div>
        {console.log(newOwners)}
        <PieChart className="piechart" width={100} height={100} title={`${user.name}'s Stats`}>
            
            {console.log('here')}
            {console.log(newOwners)}
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
              <Cell key={`cell-${index}`} fill={PieColors[index]} stroke="#3D3D5C"/>
            ))}
            </Pie>
             {console.log('there')}
        </PieChart>
        
    </>)
}