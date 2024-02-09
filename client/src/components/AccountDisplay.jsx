//display of account information
import React from "react"
import { useContext, createContext, useState } from "react"
import { userIcon } from "../styles/icons"
import { useCreateSharedHouseholdMutation, useEditHouseholdMutation, useEditUserMutation, useGetHouseholdbyJoinCodeQuery } from "../storage/pantryPartyApi"
import "../styles/colors.css"

export const userContext = createContext({id: 1, name:"Paulina", color:"pink", sharedHousehold:5})
export const tokenContext = createContext(null)
export const householdContext = createContext({users: [{id: 2, name: "Cara", color: "yellow"}, {id: 3, name: "Samantha", color: "purple"}, {id: 4, name: "Lindsay", color: "blue"}]})
export const housenameContext = createContext("Paulina's household")

export default function AccountDisplay() {
    const token = useContext(tokenContext)
    const userInfo = useContext(userContext)
    const housename = useContext(housenameContext)
    const household = useContext(householdContext)
    const [createSharedHousehold, sharedHouseholdInfo] = useCreateSharedHouseholdMutation()
    const [editHousehold, editedHousehold] = useEditHouseholdMutation()
    const [editUser, editedUser] = useEditUserMutation()
    // const [getJoinCode, joinCode] = useGetHouseholdbyJoinCodeQuery()

    const accountInfo = () => {
        return (
            <div className="accountInfo">
                <p className={userInfo.color} id={userInfo.id}> {userIcon} Welcome {userInfo.name}! </p>
                {/* Choose your color */}
                <button onClick={()=>{editUser(editedUser)}}> Choose your color </button> 
                {/* Change your name */}
                <button onClick={()=>{editUser(editedUser)}}> Change your name </button> 
                {/* Change your password */}
                <button onClick={()=>{editUser(editedUser)}}> Change your password </button> 
            </div>
        )
    }

    const householdInfo = () => {
        return(
            <div className = "householdInfo"> 
                <h3> {housename}</h3>
                {household.users.map((user) => {
                    return (
                        <p className={user.color} id={user.id}> {userIcon} {user.name} </p>
                    )
                })}
            </div> 
        )
    }

    const accountOptions = () => {
        return (
            <div className = "accountOptions">
                {!userInfo.sharedHousehold && <button onClick={()=>{createSharedHousehold(sharedHouseholdInfo)}}> Create a household to share </button> }
                {/* <button onClick={()=>{getJoinCode(joinCode)}}> Join a household </button>  */}
                <button onClick={()=>{editHousehold(editedHousehold)}}> Rename your household </button>
                {userInfo.sharedHousehold && <button onClick={()=>{editUser(editedUser)}}> Leave this household </button>}
                {userInfo.sharedHousehold && <button onClick={()=>{editUser(editedUser)}}> Remove a household member </button>}
            </div>
        )
        
    }

    return (
        <div>
            {/* {!token && <Login />} */}
            <div className="accountPage">
                {accountInfo()}
                {householdInfo()}
                {accountOptions()}
            </div>
        </div>
    )
}