//display of account information

import React, { useEffect, useContext, createContext, useState } from "react"
import { userIcon } from "../styles/icons"
import { useGetHouseholdbyIdQuery, useCreateSharedHouseholdMutation, useEditHouseholdMutation, useEditUserMutation, useGetHouseholdbyJoinCodeQuery } from "../storage/pantryPartyApi"
import Register from "./Register"
import { colorForm, nameForm, passwordForm, sharedHouseholdForm, joinHouseholdForm, renameHouseholdForm, leaveHouseholdForm, removeMemberForm } from "./AccountFunctions"
import "../styles/colors.css"
import Login from "./Login"
import  { userContext, householdContext, tokenContext } from "../storage/context"

export default function AccountDisplay() {
    const [token, setToken] = useState(null)
    const [userInfo, setUserInfo] = useState({})

    const [household, setHousehold] = useState({})
    const householdId = userInfo.sharedHouse || userInfo.defaultHouse
    const householdDetails = useGetHouseholdbyIdQuery(householdId)
    
    const [createSharedHousehold, sharedHouseholdInfo] = useCreateSharedHouseholdMutation()
    const [editHousehold, editedHousehold] = useEditHouseholdMutation()
    const [editUser, editedUser] = useEditUserMutation()
    
    const [displayForm, setDisplayForm] = useState("")
    const [newColor, setNewColor] = useState("")
    const [newName, setNewName] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newHousehold, setNewHousehold] = useState("")
    const [joinCode, setJoinCode] = useState("")
    const [newHouseholdName, setNewHouseholdName] = useState("")
    const [checked, setChecked] = useState(false)
    const [removal, setRemoval] = useState("") 

    const accountInfo = () => {
        return (
            <>
                <div className="accountInfo">
                    <p className={userInfo.color} id={userInfo.id}> {userIcon} Welcome {userInfo.name}! </p>
                    {/* Choose your color */}
                    <button onClick={() => { setDisplayForm("colorForm")}}> Choose your color </button>
                    {/* Change your name */}
                    <button onClick={() => { setDisplayForm("nameForm") }}> Change your name </button>
                    {/* Change your password */}
                    <button onClick={() => {  setDisplayForm("passwordForm") }}> Change your password </button>
                    <div className="accountUpdateForms">
                        {displayForm === "colorForm" && colorForm({newColor, setNewColor})} 
                        {displayForm === "nameForm" && nameForm({newName, setNewName})} 
                        {displayForm === "passwordForm" && passwordForm({newPassword, setNewPassword})}
                    </div>
                </div>
            </>
        )
    }

    useEffect(() => {
        if (householdDetails.isSuccess) {
            console.log(householdDetails.data)
            setHousehold(householdDetails.data)
        }}, [householdDetails.isSuccess])

        if (householdDetails.isloading) { 
                return <div> Loading... </div>}


    const householdInfo = () => {
        
        return (
            <div className="householdInfo">
            <householdContext.Provider value={householdDetails.data}>
                <h3> {household.name}</h3>
                {household.users && household.users.map((user) => {
                    return (
                        <p className={user.color} id={user.id}> {userIcon} {user.name} </p>
                        
                    )
                })}
            </householdContext.Provider>
            </div>
        )
    }

    const accountOptions = () => {
        return (
            <div className="accountOptions">
                {!userInfo.sharedHousehold && <button onClick={() => { setDisplayForm("sharedHouseholdForm") }}> Create a household to share </button>}
                {/* <button onClick={()=>{setDisplayForm("joinHouseholdForm") }}> Join a household </button>  */}
                <button onClick={() => {  setDisplayForm("renameHouseholdForm")  }}> Rename your household </button>
                {userInfo.sharedHousehold && <button onClick={() => { setDisplayForm("leaveHouseholdForm")  }}> Leave this household </button>}
                {userInfo.sharedHousehold && <button onClick={() => {  setDisplayForm("removeMemberForm") }}> Remove a household member </button>}
                <div className="accountForms"> 
                    {displayForm === "sharedHouseholdForm" && sharedHouseholdForm({newHousehold, setNewHousehold})} 
                    {displayForm === "joinHouseholdForm" && joinHouseholdForm({joinCode, setJoinCode})} 
                    {displayForm === "renameHouseholdForm" && renameHouseholdForm({newHouseholdName, setNewHouseholdName})}
                    {displayForm === "leaveHouseholdForm" && leaveHouseholdForm({checked, setChecked})} 
                    {displayForm === "removeMemberForm" && removeMemberForm({removal, setRemoval, household})} 
                </div> 
            </div>
        )
    }

    return (
        <div>
            <userContext.Provider value={userInfo}>
                {!userInfo.username && <Register userInfo={userInfo} setUserInfo={setUserInfo} />}
                {!userInfo.username && <Login userInfo={userInfo} setUserInfo={setUserInfo} />}
                {userInfo.username && 
                    <div className="accountPage">
                        {accountInfo()}
                        {householdInfo()}
                        {accountOptions()}
                        <button onClick={() => { setToken(null) }}> Log out </button>
                    </div>}
                    
            </userContext.Provider>
        </div>
    )
}